"use strict";

import React from 'react'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'

import Layout from './layout'
import Home from './ctrl/home'
import List from './ctrl/list'
import {Create, Update} from './ctrl/create_update'
import Delete from './ctrl/delete'

function GetRouter(layout) {
  return <Router history={browserHistory} routes={Routes(layout)} />;
}

function Routes(layout=Layout) {
  return (
    <Route path='/admin' component={layout}>
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
