"use strict";

import React, {Component} from 'react'
import {Link} from 'react-router'

export default class extends Component {
  render() {
    let identities = this.props.identities;
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <ul className="nav navbar-nav">
            <li><a href="/">Go to website</a></li>
            <li><Link to="/admin">Admin</Link></li>
            {identities && identities.map( identity => {
              return (
                <li className="dropdown" key={identity}>
                  <a href="#" className="dropdown-toggle"
                  data-toggle="dropdown" role="button"
                  aria-haspopup="true" aria-expanded="false">
                    {identity}
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to={`/admin/${identity}`}>List</Link></li>
                    <li><Link to={`/admin/${identity}/new`}>Create</Link></li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    )
  }
}

