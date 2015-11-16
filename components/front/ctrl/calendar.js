"use strict";

import React, {Component} from 'react';
import Calendar from '../com/calendar'
import Modal from '../com/modal'


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      rooms: this.props.rooms||[]
    }
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
  hideModal() {
    this.setState({
      show: false,
      selection: null
    })
  }
  onSubmit(data, id) {
    if (global.io) {
      if (id)
        io.socket.put("/event/"+id, data, ( res => {
          this.loadEvents()
        }))
      else
        io.socket.post("/event", data, ( res => {
          this.loadEvents()
        }))
    }
    this.hideModal()
  }
  onCancel() {
    this.hideModal()
  }
  onSelect(data) {
    this.setState({
      show: true,
      selection: data
    })
  }
  onSelectEvent(data) {
    this.setState({
      show: true,
      selection: data
    })
  }
  onChange(data) {}
  onLoad(data) {}

  render() {
    return (
      <div className="app">
        <h1>Calendar</h1>
        {this.state.show &&
          <Modal {...this.state.selection}
                  rooms={this.state.rooms}
                  onSubmit={this.onSubmit.bind(this)}
                  onCancel={this.onCancel.bind(this)}  />}
        <Calendar events={this.props.events||[]}
                  onSelect={this.onSelect.bind(this)}
                  onChange={this.onChange.bind(this)}
                  onLoad={this.onLoad.bind(this)}
                  {...this.state}
                  {...this.props.params} />
      </div>
    );
  }
}

