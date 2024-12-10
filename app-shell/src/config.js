
const os = require('os');

const config = {
  gcloud: {
    bucket: "fldemo-files",
    hash: "96b52ba12e53d4b94e939d528c21f96b"
  },
  bcrypt: {
    saltRounds: 12
  },
  admin_pass: "password",
  admin_email: "admin@flatlogic.com",
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft'
  },
  secret_key: 'HUEyqESqgQ1yTwzVlO6wprC9Kf1J1xuA',
  remote: '',
  port: process.env.NODE_ENV === "production" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  portUI: process.env.NODE_ENV === "production" ? "" : "3000",

  portUIProd: process.env.NODE_ENV === "production" ? "" : ":3000",

  swaggerUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  swaggerPort: process.env.NODE_ENV === "production" ? "" : ":8080",
  google: {
    clientId: '671001533244-kf1k1gmp6mnl0r030qmvdu6v36ghmim6.apps.googleusercontent.com',
    clientSecret: 'Yo4qbKZniqvojzUQ60iKlxqR'
  },
  microsoft: {
    clientId: '4696f457-31af-40de-897c-e00d7d4cff73',
    clientSecret: 'm8jzZ.5UpHF3=-dXzyxiZ4e[F8OF54@p'
  },
  uploadDir: os.tmpdir(),
  email: {
    from: 'Kundenportal <app@flatlogic.app>',
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
      user: 'AKIAVEW7G4PQUBGM52OF',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  roles: {

      admin: 'Administrator',
      user: 'User',
  },

  project_uuid: '9b0effed-e48e-4898-b301-99f4538f4840',
  flHost: process.env.NODE_ENV === 'production' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',

};
config.pexelsKey = 'Vc99rnmOhHhJAbgGQoKLZtsaIVfkeownoQNbTj78VemUjKh08ZYRbf18';
config.pexelsQuery = 'nature';
config.host = process.env.NODE_ENV === "production" ? config.remote : "http://localhost";
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.swaggerUrl = `${config.swaggerUI}${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}/#`;
config.backUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
