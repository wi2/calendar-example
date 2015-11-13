"use strict";

import React, {Component, cloneElement} from 'react'
import Nav from './nav'

export default class extends Component {
  render() {
    if(!this.initState)
      this.initState = global.__ReactInitState__
    return (
      <div>
        <Nav {...this.initState} />
        {this.props.children && cloneElement(this.props.children, {...this.initState})}
      </div>
    )
  }
}
