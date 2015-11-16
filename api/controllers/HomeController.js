/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

import React from 'react';
import {Home, Routes} from '../../components/front/index'


module.exports = {
  home: function(req, res) {
    var url = '/';
    if (req.param('year') && req.param('month')) {
      let tmpUrl = req.param('year') +"/"+ req.param('month');
      url = req.param('day') ? url + "week/" + tmpUrl + "/" + req.param('day')
                             : url + "month/" + tmpUrl
    }
    var state = {identities: Object.keys(sails.models)};
    Room.find().then( rooms => {
      state.rooms = rooms;
      resTo(Routes(), req.wantsJSON, res, '/', url, {title:'Home'}, state);
    })
  }

};

