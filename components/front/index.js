"use strict";

import React from 'react'
import Router, {IndexRoute, Route} from 'react-router';
import { createHistory, useBasename } from 'history'

import Layout from './layout'
import Home from './ctrl/home'
import Calendar from './ctrl/calendar'


function GetRouter(basename='/', layout) {
  const history = useBasename(createHistory)({basename});
  return <Router history={history}>{Routes(layout)}</Router>;
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
  Home: Home,
  GetRouter: GetRouter,
  Routes: Routes
}
