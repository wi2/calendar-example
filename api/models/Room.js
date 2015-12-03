/**
* Room.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: 'text',
    events: {
      collection:'Event',
      via: 'room'
    },
    color: {
      type: 'string',
      required: true,
      defaultsTo: '#AAA',
      hexColor: true
    }
  }
};

