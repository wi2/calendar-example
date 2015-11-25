"use strict";

import React, {Component} from 'react';
import _ from 'lodash';

export class TimePicker extends Component {
  constructor(props) {
    super(props)
    let diameter = Number(this.props.diameter)||150
    this.state = {
      radius: diameter*0.7/2,
      hour: Number(this.props.hour),
      minute: Number(this.props.minute),
      type: "hour",
      current: {
        hour: Number(this.props.hour),
        minute: Number(this.props.minute)
      }
    }

  }

  onSelect(val) {
    if (this.state.type === 'hour') {
      this.setState({
        type: "minute",
        hour: Number(val),
        current: {
          hour: Number(val),
          minute: this.state.current.minute,
        },
      })
    } else {
      let current = _.extend(this.state.current, {minute: Number(val)})
      this.setState({
        type: "hour",
        minute: Number(val),
        current
      })
      this.props.onSelect(current)
    }
  }

  render() {
    let radius = Number(this.props.diameter||150)/2 + "px"
      , style = {
          width: radius,
          height: radius,
          marginTop: radius,
          marginLeft: radius
        }
    return (
      <div className="time-picker" style={style}>
        <Circle />

        <Pointer className="time-minute"
                 minute={this.state.minute} type="minute" />
        <Pointer className="time-hour"
                 hour={this.state.hour} type="hour" />

        <Circle className="time-circle time-circle-small" />

        {_.range(0,12).map((num) =>
          <Dash className="time-dash"
                onSelect={this.onSelect.bind(this)}
                radius={this.state.radius}
                value={num}
                type={this.state.type} key={"dash-"+num} />)}
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
    let ratio = 360/12
      , angle = ratio * this.props.value
    this.state = {
      style: {
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${this.props.radius}px)`
      },
      numStyle: {
        transform: `translate(-50%, -50%) rotate(-${angle}deg)`
      },
      value: this.props.type === 'hour' ? this.props.value : this.props.value * 5
    }
  }
  componentWillReceiveProps(props) {
    let ratio = 360/12
      , angle = ratio * props.value
    this.setState({
      value: props.type === 'hour' ? props.value : props.value * 5
    })
  }

  _handleClick(e) {
    e.preventDefault()
    if (this.props.onSelect)
      this.props.onSelect(this.state.value)
  }
  render() {
    return (
      <div className={this.props.className||"time-dash"} style={this.state.style}>
        <div onClick={this._handleClick.bind(this)} style={this.state.numStyle}>{this.state.value}</div>
      </div>
    )
  }

}

class Pointer extends Circle {
  constructor(props) {
    super(props)
    console.log("thisprops", this.props)
    let ratio = props.type === 'hour' ? 360/12 : 360/60
      , value = Number(this.props.minute||this.props.hour)
      , angle = ratio * value
    this.state = {
      style: {
        transform: `translate(-50%, -50%) rotate(${angle}deg)`
      }
    }
  }
  componentWillReceiveProps(props) {
    console.log("props", props)
    let ratio = props.type === 'hour' ? 360/12 : 360/60
      , value = Number(props.minute||props.hour)
      , angle = ratio * value
    this.setState({
      style: {
        transform: `translate(-50%, -50%) rotate(${angle}deg)`
      }
    })
  }
  render() {
    return <div className={this.props.className} style={this.state.style} />
  }
}


