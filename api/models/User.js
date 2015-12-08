/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username  : {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    role: {
      model: 'Role',
      required: true
    },
    events: {
      collection:'Event',
      via: 'member'
    },
    members: {
      collection:'Event',
      via: 'members'
    },
    active: {
      type: 'boolean',
      defaultsTo: true
    }
  }
};

