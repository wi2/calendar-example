"use strict";

import React from 'react'
import Router, {IndexRoute, Route} from 'react-router';
import { createHistory, useBasename } from 'history'

import Layout from './layout'
import Home from './ctrl/home'
import List from './ctrl/list'
import {Create, Update} from './ctrl/create_update'
import Delete from './ctrl/delete'


function GetRouter(basename='/admin', layout) {
  const history = useBasename(createHistory)({basename});
  return <Router history={history}>{Routes(layout)}</Router>;
}

function Routes(layout=Layout) {
  return (
    <Route path='/' component={layout}>
      <IndexRoute component={Home} />
      <Route path=":identity" component={List} />
      <Route path=":identity/new" component={Create} />
      <Route path=":identity/:id" component={Update} />
      <Route path=":identity/:id/delete" component={Delete} />
    </Route>
  );
}

module.exports = {
  Home: Home,
  List: List,
  Create: Create,
  Update: Update,
  Delete: Delete,
  GetRouter: GetRouter,
  Routes: Routes
}
