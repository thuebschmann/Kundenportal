const projektFields = {
  id: { type: 'id', label: 'ID' },

  name: { type: 'string', label: 'Name' },

  status: { type: 'int', label: 'Status' },

  url: { type: 'string', label: 'URL' },

  apikey: { type: 'string', label: 'apikey' },

  kunden_id: {
    type: 'relation_many',
    label: 'Kunden Id',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default projektFields;
