import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
global.__ReactInitState__

module.exports = function(routes, wantsJSON, res, basename, location, locals, state) {
  console.log(location)
  if (!wantsJSON) {
    match({ routes, location, basename }, (error, redirectLocation, renderProps) => {
      if (state) {
        global.__ReactInitState__ = state;
        locals.state = '__ReactInitState__=' + JSON.stringify(state) + ';';
      }
      res.view("layout", {
        locals: locals||{title:'',description:''},
        body: renderToString(<RoutingContext {...renderProps} />)
      });
    })
  } else if (state) {
    res.json(state);
  } else
    console.log("no state...")
}
