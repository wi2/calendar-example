"use strict";

import React, {Component} from 'react'
import AdminComponent from './admin'

export default class extends AdminComponent {
  componentWillMount() {
    if (typeof io !== "undefined")
      io.socket.get(this.props.root||'/admin', (res => { this.setState(res) }));
  }
  render() {
    return (
      <h1>ADMIN: HomePage</h1>
    );
  }
}

