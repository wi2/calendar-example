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
  loadEvents() {
    if (global.io)
      io.socket.get('/event', res => {
        this.setState({events: res})
      });
  }
  onSelectDate(selection) {
    console.log(selection)
  }

  render() {
    let now = new Date()
    return (
      <div className="app">
        <h1>Calendar</h1>
        <Calendar events={this.props.events||[]}
              onSelectDate={this.onSelectDate}
              {...this.state}
              {...this.props.params} />
      </div>
    );
  }
}

