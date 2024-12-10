FROM php:8.0.14-fpm-bullseye

WORKDIR /app
COPY . /app

ENV CFLAGS="$CFLAGS -D_GNU_SOURCE"

RUN docker-php-ext-install pdo pdo_mysql sockets
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_sqlsrv sqlsrv sockets
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer update
RUN composer install

EXPOSE 8080
