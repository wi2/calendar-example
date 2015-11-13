"use strict";

import React, {Component} from 'react'
import {Link} from 'react-router'
import Agenda from './lib/agenda'


export default class extends Component {
  render() {
    let identities = this.props.identities
      , agenda = new Agenda()
      , now = agenda.getToday()
      , link = `/month/${now.y}/${now.m}/`

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <ul className="nav navbar-nav">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to={link}>Calendar</Link></li>
            <li><a href="/admin">Mon Admin</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

