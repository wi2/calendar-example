/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    content: {
      type: 'text'
    },
    user: {
      model: 'user'
    },
    room: {
      model: 'room'
    },
    start: {
      type: 'datetime',
      required: true
    },
    end: {
      type: 'datetime',
      required: true
    }

  }
};

