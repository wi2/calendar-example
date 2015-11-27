"use strict";

import React, {Component} from 'react';
import _ from 'lodash';

export default class extends Component {
  constructor(props) {
    super(props)
    let diameter = Number(this.props.diameter)||200
      , hour = Number(this.props.hour)
      , minute = Number(this.props.minute)
    this.state = {
      diameter,
      radius: diameter*0.7/2,
      type: this.props.type || "hour",
      ampm: hour > 11 ? 'PM' : 'AM',
      hour,
      minute,
      current: { hour, minute }
    }
  }
  toggle() {
    this.setState({ ampm: this.state.ampm === 'AM' ? 'PM' : 'AM' })
  }

  onSelect(val) {
    if (this.state.type === 'hour') {
      let hour = Number(val)
      this.setState({
        type: "minute",
        hour,
        current: { hour, minute: this.state.current.minute },
      })
    } else {
      let minute = Number(val)
        , current = _.extend(this.state.current, {minute})
      this.setState({
        type: "hour",
        minute,
        current
      })
      this.props.onSelect(current)
    }
  }

  render() {
    let radius = this.state.diameter/2 + "px"
      , style = {
          width: radius,
          height: radius,
          marginTop: radius,
          marginLeft: radius
        }
      , except = this.props.except
      , disabled
      , items = []
      , range = this.state.type === 'minute' || this.state.ampm === 'AM' ? {start: 0, end: 12} : {start: 12, end: 24}

      for(let num=range.start; num<range.end; num++) {
        disabled = false
        if (this.state.type === 'hour')
          for(let i=0, len=except.length; i<len; i++)
            if(typeof except[i] === 'object' && typeof except[i].start === 'number' && except[i].start <= num && except[i].end >= num)
              disabled = true
        items.push({num, disabled});
      }

    return (
      <div className="time-picker" style={style}>
        <Circle />

        <Pointer className="time-minute"
                 minute={this.state.minute} type="minute" />
        <Pointer className="time-hour"
                 hour={this.state.hour} type="hour" />

        <Choice className="time-circle time-circle-button"
                ampm={this.state.ampm}
                onToggle={this.toggle.bind(this)} />

        {items.map(item =>
          <Dash className="time-dash"
                disabled={item.disabled}
                onSelect={this.onSelect.bind(this)}
                radius={this.state.radius}
                value={item.num}
                ampm={this.state.ampm}
                type={this.state.type} key={"dash-"+item.num} />)}
      </div>
    )
  }
}

class Circle extends Component {
  render() {
    return <div className={this.props.className||"time-circle"} />
  }
}

class Choice extends Circle {
  constructor(props) {
    super(props)
    this.state = { ampm: this.props.ampm }
  }
  componentWillReceiveProps(props) {
    this.setState({ ampm: props.ampm })
  }
  toggle() {
    if (this.props.onToggle) this.props.onToggle()
  }
  render() {
    return <div className={this.props.className} onClick={this.toggle.bind(this)}>{this.state.ampm}</div>
  }
}

class Dash extends Circle {
  constructor(props) {
    super(props)
    let ratio = 360/12
      , angle = ratio * this.props.value
      , value = this.props.value

    value = this.props.type === 'hour' ? value : value * 5

    this.state = {
      style: {
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${this.props.radius}px)`
      },
      numStyle: {
        transform: `translate(-50%, -50%) rotate(-${angle}deg)`
      },
      value
    }
  }
  componentWillReceiveProps(props) {
    let ratio = 360/12
      , angle = ratio * props.value
      , value = props.value

    if (props.type === 'minute') {
      value = value * 5
    }
    this.setState({ value })
  }

  _handleClick(e) {
    e.preventDefault()
    if (this.props.onSelect && !this.props.disabled)
      this.props.onSelect(this.state.value)
  }
  render() {
    let className = this.props.className||"time-dash"
    if (this.props.disabled)
      className += " time-dash-disabled"
    return (
      <div className={className} style={this.state.style}>
        <div onClick={this._handleClick.bind(this)} style={this.state.numStyle}>{this.state.value}</div>
      </div>
    )
  }
}

class Pointer extends Circle {
  constructor(props) {
    super(props)
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


