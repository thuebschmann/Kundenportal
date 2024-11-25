const db = require('../models');
const Users = db.users;

const Kunde = db.kunde;

const Projekt = db.projekt;

const Rechnungen = db.rechnungen;

const KundeData = [
  {
    name: 'James Watson',

    vorname: "Goin' hog huntin'",

    strasse: 'Let me tell ya',

    plz: "I'm washing my hands of it",

    ort: 'Yup',

    land: 'No one tells me shit',

    // type code here for "relation_many" field
  },

  {
    name: 'Linus Pauling',

    vorname: "How 'bout them Cowboys",

    strasse: "That Barbala couldn't fly his way out of a wet paper bag",

    plz: 'Let me tell ya',

    ort: "It's around here somewhere",

    land: 'Might be DQ time',

    // type code here for "relation_many" field
  },

  {
    name: 'Jean Baptiste Lamarck',

    vorname: 'So I was walking Oscar',

    strasse: 'I tell you what',

    plz: 'That damn gimble',

    ort: "That's messed up",

    land: 'My buddy Harlen',

    // type code here for "relation_many" field
  },

  {
    name: 'Edward Teller',

    vorname: 'That goddamn Datamate',

    strasse: 'So I was walking Oscar',

    plz: 'My buddy Harlen',

    ort: 'Might be DQ time',

    land: 'Always the last one to the party',

    // type code here for "relation_many" field
  },

  {
    name: 'Erwin Schrodinger',

    vorname: 'Let me tell ya',

    strasse: 'I want my 5$ back',

    plz: 'So I was walking Oscar',

    ort: 'Yup',

    land: "Y'all never listen to me",

    // type code here for "relation_many" field
  },
];

const ProjektData = [
  {
    name: 'Dmitri Mendeleev',

    status: 5,

    url: "How 'bout them Cowboys",

    apikey: 'Got depression, Smith and Wessen',

    // type code here for "relation_many" field
  },

  {
    name: 'Hermann von Helmholtz',

    status: 4,

    url: 'Got depression, Smith and Wessen',

    apikey: "Y'all never listen to me",

    // type code here for "relation_many" field
  },

  {
    name: 'Isaac Newton',

    status: 3,

    url: 'My boss gonna fire me',

    apikey: "That Barbala couldn't fly his way out of a wet paper bag",

    // type code here for "relation_many" field
  },

  {
    name: 'Sheldon Glashow',

    status: 5,

    url: 'My buddy Harlen',

    apikey: 'I want my damn cart back',

    // type code here for "relation_many" field
  },

  {
    name: 'Comte de Buffon',

    status: 1,

    url: "C'mon Naomi",

    apikey: 'I want my 5$ back',

    // type code here for "relation_many" field
  },
];

const RechnungenData = [
  {
    invoice_id: 7,

    projekt_id: 6,
  },

  {
    invoice_id: 1,

    projekt_id: 2,
  },

  {
    invoice_id: 6,

    projekt_id: 2,
  },

  {
    invoice_id: 6,

    projekt_id: 8,
  },

  {
    invoice_id: 9,

    projekt_id: 7,
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
