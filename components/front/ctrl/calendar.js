"use strict";

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Calendar from '../com/calendar';
import Modal from '../com/modal';


export default class extends Component {
  constructor(props) {
    super(props)
    this.except = [
      'Sun',
      'Sat',
      {start: new Date(2015, 9, 7), end: new Date(2015, 9, 11)},
      {start: new Date(2015, 9, 15), end: new Date(2015, 9, 17)},
      {start: 0, end: 6},
      {start: 20, end: 23},
      new Date(2015, 10, 7),
      new Date(2015, 10, 10)
    ];
    this.state = {
      show: false,
      rooms: this.props.rooms||[],
      width: 1000
    }
    this.timeout = null;
    this.loadEvents()
    if (global.io)
      io.socket.on('event', msg => this.loadEvents());
  }
  componentDidMount() {
    this.setState({width:findDOMNode(this).offsetWidth})
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillReceiveProps(props) {
    this.loadEvents()
  }
  shouldComponentUpdate(props, state) {
    return this.state && this.state !== state
  }
  componentWillUnmount() {
    if (global.io)
      io.socket.off()
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e) {
    setTimeout(() => {
      this.setState({width:e.target.innerWidth})
    }, 50);
    setTimeout(() => {
      this.setState({width:e.target.innerWidth})
    }, 100);//need twice for window resize and show inspector (why??)
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
                  onCancel={this.onCancel.bind(this)}
                  except={this.except}
                  {...this.props.params} />}
        <Calendar events={this.props.events||[]}
                  onSelect={this.onSelect.bind(this)}
                  onChange={this.onChange.bind(this)}
                  onLoad={this.onLoad.bind(this)}
                  {...this.state}
                  height={700} width={this.state.width}
                  except={this.except}
                  {...this.props.params} />
      </div>
    );
  }
}

