"use strict";

import React from 'react'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'

import Layout from './layout'
import Home from './ctrl/home'
import Calendar from './ctrl/calendar'


function GetRouter(layout) {
  return <Router history={browserHistory} routes={Routes(layout)} />;
}

function Routes(layout=Layout) {
  return (
    <Route path='/' component={layout}>
      <IndexRoute component={Home} />
      <Route path="/:view/:year/:month" component={Calendar} />
      <Route path="/:view/:year/:month/:day" component={Calendar} />
    </Route>
  );
}

module.exports = {
  GetRouter: GetRouter,
  Routes: Routes
}
