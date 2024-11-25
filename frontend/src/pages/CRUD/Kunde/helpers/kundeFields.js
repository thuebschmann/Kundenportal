const kundeFields = {
  id: { type: 'id', label: 'ID' },

  name: { type: 'string', label: 'Name' },

  vorname: { type: 'string', label: 'Vorname' },

  strasse: { type: 'string', label: 'Strasse' },

  plz: { type: 'string', label: 'PLZ' },

  ort: { type: 'string', label: 'Ort' },

  land: { type: 'string', label: 'Land' },

  user: {
    type: 'relation_many',
    label: 'User',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default kundeFields;
