"use strict";

import React, {Component} from 'react';
import Agenda from '../lib/agenda'
import {Header, Navigation, Vertical, Row, Cell, Info} from './calendar-utils'


export class TimePicker extends Component {
  constructor(props) {
    super(props)
    let diameter = Number(this.props.diameter)||200
    this.state = {
      big: {
        diameter,
        background: '#FF0000'
      },
      small: {
        diameter: diameter * 0.6,
        left: diameter * 0.2,
        top: diameter * 0.2
      }
    }
  }
  render() {

    return (
      <div className="time-picker">
        <Circle {...this.state.big} />
        <Circle {...this.state.small} />
      </div>
    )
  }
}



class Circle extends Component {
  constructor(props) {
    super(props)
    let diameter = Number(this.props.diameter)||100;
    this.state = {
      style: {
        width: diameter+"px",
        height: diameter+"px",
        left: this.props.left||0,
        top: this.props.top||0,
        background: this.props.background||'#CCC',
      }
    }
  }

  render() {
    return <div className="circle" style={this.state.style} />
  }
}





