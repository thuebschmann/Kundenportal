const db = require('../models');
const Users = db.users;

const Kunde = db.kunde;

const Projekt = db.projekt;

const Rechnungen = db.rechnungen;

const KundeData = [
  {
    name: 'Gertrude Belle Elion',

    vorname: 'That damn Bill Stull',

    strasse: 'My boss gonna fire me',

    plz: 'Got depression, Smith and Wessen',

    ort: 'Reminds me of my old girlfriend Olga Goodntight',

    land: 'Yup',

    // type code here for "relation_many" field
  },

  {
    name: 'B. F. Skinner',

    vorname: 'That damn gimble',

    strasse: 'That damn diabetes',

    plz: 'Turd gone wrong',

    ort: 'I want my 5$ back',

    land: 'Like a red-headed stepchild',

    // type code here for "relation_many" field
  },

  {
    name: 'Christiaan Huygens',

    vorname: 'That damn diabetes',

    strasse: 'Contact the tower',

    plz: 'That goddamn Datamate',

    ort: 'That goddamn Datamate',

    land: "Goin' hog huntin'",

    // type code here for "relation_many" field
  },

  {
    name: 'Franz Boas',

    vorname: 'That damn Bill Stull',

    strasse: 'That damn diabetes',

    plz: 'I got that scurvy',

    ort: 'I got that scurvy',

    land: 'Always the last one to the party',

    // type code here for "relation_many" field
  },
];

const ProjektData = [
  {
    name: 'Sheldon Glashow',

    status: 7,

    url: "That Barbala couldn't fly his way out of a wet paper bag",

    apikey: "Goin' hog huntin'",

    // type code here for "relation_many" field
  },

  {
    name: 'Jean Baptiste Lamarck',

    status: 2,

    url: "I'm washing my hands of it",

    apikey: 'I tell you what',

    // type code here for "relation_many" field
  },

  {
    name: 'Ernest Rutherford',

    status: 8,

    url: 'I want my 5$ back',

    apikey: 'That goddamn Datamate',

    // type code here for "relation_many" field
  },

  {
    name: 'John von Neumann',

    status: 9,

    url: 'That damn gimble',

    apikey: "I'm washing my hands of it",

    // type code here for "relation_many" field
  },
];

const RechnungenData = [
  {
    invoice_id: 1,

    projekt_id: 4,
  },

  {
    invoice_id: 3,

    projekt_id: 9,
  },

  {
    invoice_id: 9,

    projekt_id: 4,
  },

  {
    invoice_id: 2,

    projekt_id: 3,
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Kunde.bulkCreate(KundeData);

    await Projekt.bulkCreate(ProjektData);

    await Rechnungen.bulkCreate(RechnungenData);

    await Promise.all([
      // Similar logic for "relation_many"
      // Similar logic for "relation_many"
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('kunde', null, {});

    await queryInterface.bulkDelete('projekt', null, {});

    await queryInterface.bulkDelete('rechnungen', null, {});
  },
};
