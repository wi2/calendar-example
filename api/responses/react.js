/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.react();
 * return res.react(data);
 * return res.react(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
global.__ReactInitState__


module.exports = function sendReact (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.react() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

  // If appropriate, serve data as JSON(P)
  if (req.wantsJSON) {
    return res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if (options.view) {
    let {routes, location, locals, basename} = options;
    match({ routes, location, basename }, (error, redirectLocation, renderProps) => {
      if (data) {
        global.__ReactInitState__ = data;
        locals.state = '__ReactInitState__=' + JSON.stringify(data) + ';';
      }
      res.view(options.view, {
        locals: locals||{title:'',description:''},
        body: renderToString(<RouterContext {...renderProps} />)
      });
    })
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView({ data }, function couldNotGuessView () {
    return res.jsonx(data);
  });

};
