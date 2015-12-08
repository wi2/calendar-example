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
    var state = {
      identities: Object.keys(sails.models),
      isLogged: req.session.authenticated
    };
    Room.find()
      .then( rooms => {
        state.rooms = rooms;
        return User.find()
      })
      .then( users => {
        state.users = users;
        return Exception.find()
      })
      .then( exception => {
        state.exception = exception;
        if (req.session.authenticated)
          return User.findOneById(req.session.passport.user).populate('role')
        else
          return
      })
      .then( user => {
        if (user) state.me = user
        state.isAdmin = (user && user.role.name == 'admin')
        resTo(Routes(), req.wantsJSON, res, '/', url, {title:'Home'}, state);
      })
  }

};

