"use strict";

import React, {Component} from 'react';
import _ from 'lodash';
import {findDOMNode} from 'react-dom';
import Calendar from '../com/calendar';
import Modal from '../com/modal';
import Panel from '../com/panel';

export default class extends Component {
  constructor(props) {
    super(props)
    this.except = [
      'Sun',
      'Sat',
      {start: new Date(2015, 9, 7), end: new Date(2015, 9, 11)},
      {start: new Date(2015, 9, 15), end: new Date(2015, 9, 17)},
      {start: new Date(2015, 11, 7, 14), end: new Date(2015, 11, 7, 17)},
      {start: 0, end: 6},
      {start: 20, end: 23},
      new Date(2015, 10, 7),
      new Date(2015, 10, 10),
      new Date(2015, 11, 8, 16)

    ];
    this.state = {
      show: false,
      rooms: this.props.rooms||[],
      width: 1000,
      height: 700,
      defaultRight: typeof document !== "undefined" ? -document.body.offsetWidth*0.2 : -500,
      right: typeof document !== "undefined" ? -document.body.offsetWidth*0.2 : -500,
      filters: { where: {} }
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
  componentDidUpdate(props, state) {
    if (this.state.filters !== state.filters)
      this.loadEvents()
  }
  componentWillReceiveProps(props) {
    this.loadEvents(props)
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
    setTimeout(() => { this.setState({
      width:e.target.innerWidth,
      right: -e.target.innerWidth*0.2
    }) }, 50);
    setTimeout(() => { this.setState({
      width:e.target.innerWidth,
      right: -e.target.innerWidth*0.2
    }) }, 100);//need twice for window resize and show inspector (why??)
  }
  loadEvents(props=this.props) {
    let months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"]
      , currentMonth = months.indexOf(props.params.month)
      , dateStart = new Date(props.params.year, currentMonth - 1)
      , dateEnd = new Date(props.params.year, currentMonth + 1)
      , filters = {
        where: {
          room: this.state.filters.room,
          or: [
            {start: { '>=': dateStart, '<=': dateEnd }},
            {end: { '>=': dateStart, '<=': dateEnd }},
            {start: { '<=': dateStart }, end: { '>=': dateEnd }}
          ]
        }
      }

    if (global.io)
      io.socket.get('/event', filters, res => this.setState({ events: res }) );
  }
  hideModal() {
    this.setState({ show: false, selection: null })
  }
  onFilterChange(filters) {
    this.setState({filters})
  }
  onSubmit(data, id) {
    if (global.io) {
      if (id)
        io.socket.put("/event/"+id, data, ( res => this.loadEvents() ))
      else
        io.socket.post("/event", data, ( res => {
          if (res.error)
            console.log("Error", res)
          else
            this.loadEvents()
        }))
    }
    this.hideModal()
  }
  onDelete(id) {
    io.socket.delete("/event/"+id, ( res => this.loadEvents() ))
    this.hideModal()
  }
  onCancel() {
    this.hideModal()
  }
  onSelectDatePanel(val) {
    let url = `/day/${val.year}/${val.monthName}/${Math.abs(val.day)}`;
    this.props.history.pushState(null, url, {force: true});
    this.setState({current: val})
  }

  onSelect(data, edition=false) {
    if (edition)
      this.setState({
        show: true,
        selection: data,
        width: document.body.offsetWidth,
        right: -document.body.offsetWidth*0.2,
      })
    else {
      this.setState({
        current: data,
        width: document.body.offsetWidth*0.8,
        defaultRight: -document.body.offsetWidth*0.2,
        right: 0
      })
      setTimeout(() => { this.setState({
        width: document.body.offsetWidth*0.8
      }) })// twice : why?
    }
  }

  onChange(data) {}
  onLoad(data) {}

  render() {
    return (
      <div className="app">
        {this.state.current &&
          <Panel {...this.state.current}
                  onSelectDate={this.onSelectDatePanel.bind(this)}
                  right={this.state.right||0}
                  defaultRight={this.state.defaultRight}
                  except={this.except}
                  events={this.state.events||this.props.events||[]}  />}

        {this.state.show &&
          <Modal {...this.state.selection}
                  rooms={this.state.rooms}
                  onSubmit={this.onSubmit.bind(this)}
                  onCancel={this.onCancel.bind(this)}
                  onDelete={this.onDelete.bind(this)}
                  except={this.except}
                  {...this.props.params} />}

        <Calendar events={this.props.events||[]}
                  except={this.except}
                  onSelect={this.onSelect.bind(this)}
                  onChange={this.onChange.bind(this)}
                  onLoad={this.onLoad.bind(this)}
                  onFilterChange={this.onFilterChange.bind(this)}
                  {...this.state}
                  {...this.props.params} />
      </div>
    );
  }
}

