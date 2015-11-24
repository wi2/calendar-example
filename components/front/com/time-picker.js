"use strict";

import React, {Component} from 'react';
import _ from 'lodash';

export class TimePicker extends Component {
  constructor(props) {
    super(props)
    let diameter = Number(this.props.diameter)||150
    this.state = {
      dash: {
        radius: diameter*0.7/2
      },
      hour: {
        angle: Number(this.props.hour) * (360/12)
      },
      minute: {
        angle: Number(this.props.minute) * (360/60)
      }
    }
  }
  render() {
    let radius = Number(this.props.diameter||150)/2 + "px"
      , style = { width: radius, height: radius}
    return (
      <div className="time-picker" style={style}>
        <Circle />
        <Pointer className="time-minute" {...this.state.minute} />
        <Pointer className="time-hour" {...this.state.hour} />
        <Circle className="time-circle time-circle-small" />
        {_.range(0,12).map((num) => <Dash key={"num"+num} className="time-dash" {...this.state.dash} angle={num * (360/12)} value={num} />)}
      </div>
    )
  }
}

class Circle extends Component {
  render() {
    return <div className={this.props.className||"time-circle"} />
  }
}

class Dash extends Circle {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        transform: `translate(-50%, -50%) rotate(${this.props.angle}deg) translateY(-${this.props.radius}px)`
      },
      numStyle: {
        transform: `translate(-50%, -50%) rotate(-${this.props.angle}deg)`
      }
    }
  }
  render() {
    return (
      <div className={this.props.className||"time-dash"} style={this.state.style}>
        <div style={this.state.numStyle}>{this.props.value * 5}</div>
      </div>
    )
  }

}

class Pointer extends Dash {

  componentWillReceiveProps(props) {
    let diameter = props.diameter||100;
    this.setState({
      style: {
        transform: `translate(-50%, -50%) rotate(${props.angle}deg)`
      }
    })
  }
  render() {
    return <div className={this.props.className} style={this.state.style} />
  }
}


