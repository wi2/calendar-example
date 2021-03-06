/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

import React from 'react';
import {Home, List, Create, Update, Routes} from '../../components/admin/index'



module.exports = {
  home: function(req, res) {
    var state = {identities: Object.keys(sails.models)};
    res.react(state, {
      view: 'layout',
      routes: Routes(),
      location: '/admin',
      locals: {title:'Administration - Home'}
    })
  },
  new: function(req, res) {
    getFormDefinition( req.param('identity') )
    .then( result => {
      var state = {
        identity: req.param('identity'),
        identities: Object.keys(sails.models),
        formItem: result,
        item: null
      };
      res.react(state, {
        view: 'layout',
        routes: Routes(),
        location: '/admin' + req.param('identity')+'/new',
        basename: '/admin',
        locals: {title:'Administration - create record'}
      })
    })
    .catch( error => {
      console.log("ERROR: ", error)
    });
  },
  update: function(req, res) {
    var item;
    sails.models[req.param('identity')].findOne(req.param('id'))
    .exec(function(err, itm) {
      item = itm;
      return getFormDefinition( req.param('identity') )
              .then( result => {
                var state = {
                  identity: req.param('identity'),
                  identities: Object.keys(sails.models),
                  formItem: result,
                  item: item
                };
                return res.react(state, {
                  view: 'layout',
                  routes: Routes(),
                  location: '/admin' + req.param('identity')+'/'+req.param('id'),
                  basename: '/admin',
                  locals: {title:'Administration - update record'}
                })
              })
              .catch( error => {
                console.log("ERROR: ", error)
              });
    });
  },
  delete: function(req, res) {
    var item;
    sails.models[req.param('identity')].findOne(req.param('id'))
    .exec(function(err, itm) {
      item = itm;
      return getFormDefinition( req.param('identity') )
              .then( result => {
                var state = {
                  identity: req.param('identity'),
                  identities: Object.keys(sails.models),
                  formItem: result,
                  item: item
                };
                res.react(state, {
                  view: 'layout',
                  routes: Routes(),
                  location: '/admin' + req.param('identity')+'/'+req.param('id'),
                  basename: '/admin',
                  locals: {title:'Administration - delete record'}
                })
              })
              .catch( error => {
                console.log("ERROR: ", error)
              });
    })
  },
  list: function(req, res) {
    var items, current, total, limit, skip;
    var query = sails.models[req.param('identity')]

    query
      .count(req.param('contain')||{})
      .exec(function(err, count) {
        limit = req.param('limit')||5;
        skip = req.param('skip')||0;
        if(skip == null) skip = 0;
        total = count;
        current = skip ? Math.ceil(skip/limit)+1 : 1;
        return query
          .find(req.param('contain')||{})
          .limit(limit)
          .skip(skip)
          .sort(req.param('sort')||"id ASC")
          .exec(function(err, result) {
            items = result;
            return getFormDefinition( req.param('identity') )
                    .then( result => {
                    var state = {
                      identity: req.param('identity'),
                      identities: Object.keys(sails.models),
                      formItem: result,
                      items: items,
                      current: current,
                      total: total,
                      limit: limit
                    };
                    res.react(state, {
                      view: 'layout',
                      routes: Routes(),
                      location: '/admin' + req.param('identity'),
                      basename: '/admin',
                      locals: {title:'Administration - list records'}
                    })
                  })
                  .catch( error => {
                    console.log("ERROR: ", error)
                  });
          });
      })
  }
};
