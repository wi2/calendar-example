"use strict";

import React, {Component} from 'react';
import Calendar from '../com/calendar'


export default class extends Component {
  constructor(props) {
    super(props)
    this.loadEvents()
    if (global.io)
      io.socket.on('event', msg => this.loadEvents());
  }
  componentWillReceiveProps(props) {
    this.loadEvents()
  }
  shouldComponentUpdate(props, state) {
    return this.state && this.state !== state
  }
  componentWillUnmount() {
    if (global.io) io.socket.off()
  }

  loadEvents() {
    if (global.io)
      io.socket.get('/event', res => {
        this.setState({events: res})
      });
  }
  onSelect(data) {
    console.log("onSelectDate", data)
  }
  onChange(data) {
    console.log("onChange", data)
  }
  onLoad(data) {
    console.log("onLoad", data)
  }

  render() {
    return (
      <div className="app">
        <h1>Calendar</h1>
        <Calendar events={this.props.events||[]}
              onSelect={this.onSelect}
              onChange={this.onChange}
              onLoad={this.onLoad}
              {...this.state}
              {...this.props.params} />
      </div>
    );
  }
}

