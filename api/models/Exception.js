/**
* Exception.js
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
    type: {
      type: 'string',
      in: ["day", "hours", "date", "dates", "datesHour"],
      required: true
    },

    day: {
      type: 'string',
      in: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },

    date: {
      type: 'date'
    },

    startDate: {
      type: 'datetime'
    },
    endDate: {
      type: 'datetime'
    },

    startHour: {
      type: 'integer'
    },
    endHour: {
      type: 'integer'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    }
  }
};

