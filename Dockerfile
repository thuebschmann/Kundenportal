FROM node:20.15.1-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --pure-lockfile
COPY frontend .
RUN yarn build

FROM php:8.0-apache
ENV CFLAGS="$CFLAGS -D_GNU_SOURCE"

RUN apt-get update && apt-get install -y libpq-dev openssl zip unzip git vim

# Configure PHP for Cloud Run.
# Precompile PHP code with opcache.

RUN docker-php-ext-install -j "$(nproc)" opcache pdo pdo_mysql sockets
RUN set -ex; \
{ \
echo "; Cloud Run enforces memory & timeouts"; \
echo "memory_limit = -1"; \
echo "max_execution_time = 0"; \
echo "; File upload at Cloud Run network limit"; \
echo "upload_max_filesize = 32M"; \
echo "post_max_size = 32M"; \
echo "; Configure Opcache for Containers"; \
echo "opcache.enable = On"; \
echo "opcache.validate_timestamps = Off"; \
echo "; Configure Opcache Memory (Application-specific)"; \
echo "opcache.memory_consumption = 32"; \
} > "$PHP_INI_DIR/conf.d/cloud-run.ini"

# Copy in custom code from the host machine.
WORKDIR /var/www/html
COPY ./backend ./backend
COPY --from=builder /app/build /var/www/html/backend/public

WORKDIR /var/www/html/backend

# Get Composer and insall php dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer update && composer install

# Setup new Apache document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html/backend/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Enable mod rewrite
RUN a2enmod rewrite headers

# Use the PORT environment variable in Apache configuration files.
# https://cloud.google.com/run/docs/reference/container-contract#port
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Configure PHP for development.
# Switch to the production php.ini for production operations.
# RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
# https://github.com/docker-library/docs/blob/master/php/README.md#configuration
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

# Allow Apache to access a source code and .htaccess file
RUN chmod -R 755 /var/www/html/backend/ && chmod 644 /var/www/html/backend/public/.htaccess && chmod -R 777 /var/www/html/backend/storage/

# Do laravel prepartions and start Apache
CMD php artisan key:generate && php artisan jwt:secret && php artisan migrate && php artisan db:seed && apache2-foreground

