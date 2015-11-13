"use strict";

import React, {Component} from 'react';
import _ from 'lodash'
import { render } from 'react-dom';
import {Link} from 'react-router';
import Agenda from '../lib/agenda'

export default class extends Component {
  render() {
    let agenda = new Agenda()
      , now = agenda.getToday()
      , link = `/month/${now.y}/${now.m}/`
    return (
      <div className="app">
        <h1>HomePage</h1>
        <Link to={link}>Go to calendar</Link>
      </div>
    );
  }
}
