"use strict";

import React, {Component} from 'react';
import {Vertical, Row, Cell} from './calendar-utils';


class ViewDefault extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width,
      height: this.props.height
    };
  }
  setDimension(width, height) {
    this.setState({width, height});
  }

  toggleSelection(val) {
    if (this.props.editor)
      this.props.toggleSelection(val)
  }
  moveSelection(val) {
    if (this.props.editor)
      this.props.moveSelection(val)
  }
  onSelect(val) {
    if (this.props.editor)
      this.props.onSelect(val)
  }
}

export class Week extends ViewDefault {
  componentDidMount() {
    this.setDimension(this.props.width/7, this.props.height/24)
  }
  componentWillReceiveProps(props) {
    this.setDimension(this.props.width/7, this.props.height/24)
  }

  style(left, evt) {
    let {room, cell} = evt
      , width = this.props.height/23;

    return {
      left: left + 'px',
      top: `${cell.start * width}px`,
      width: `${(cell.end - cell.start + 1) * width}px`,
      transform: 'rotate(90deg)',
      transformOrigin: 'left top 0',
      background: room.color||'grey'
    }
  }

  render() {
    let events
      , left = 22
      , week = this.props.week
    if (this.props.agenda && this.props.events) {
      events = this.props.agenda.getEvents(week, this.props.events, true)
    }
    let selection = {
      s: this.props.selectionStart.date,
      e: this.props.selectionEnd.date
    }

    return (
      <Vertical>
        {events && events.map((evt, i) => <div className="event"
                                            style={this.style(left+=13, evt)}
                                            onClick={this.onSelect.bind(this, evt)}
                                            key={`event-${i}`}>{evt.title}</div> )}
        {week.map((item) => {
          let cond = (item.date >= selection.s && item.date <= selection.e)
          let props = {
            value: item.hour,
            className: cond ? "col-day col-day-active" : "col-day",
            toggleSelection: this.toggleSelection.bind(this, item),
            moveSelection: this.moveSelection.bind(this, item),
            key: `hour-${item.hour}-${item.row}-${item.col}`
          }
          return <Cell {...props} {...this.state} />
        })}
      </Vertical>
    )
  }
}


export class Month extends ViewDefault {
  componentDidMount() {
    this.setDimension(this.props.width/7, this.props.height/7)
  }
  componentWillReceiveProps(props) {
    this.setDimension(this.props.width/7, this.props.height/7)
  }

  style(top, evt) {
    let {room, cell} = evt
      , width = this.state.width

    return {
      top: top + 'px',
      left: `${cell.start * width}px`,
      width: `${(cell.end - cell.start + 1) * width}px`,
      background: room.color||'grey'
    }
  }

  render() {
    let top = 0
    let week = this.props.week
    let events = this.props.agenda.getEvents(week, this.props.events)
    let selection = {
      s: this.props.selectionStart.date,
      e: this.props.selectionEnd.date
    }
    let that = this
    return (
      <Row>
        {events && events.map((evt, i) => <div className="event"
                                            style={this.style(top+=13, evt)}
                                            onClick={this.onSelect.bind(this, evt)}
                                            key={`event-${i}`}>{evt.title}</div> )}
        {week.map((item) => {
          let cond = (item.date >= selection.s && item.date <= selection.e)
          let props = {
            value: item.day,
            className: cond ? "col col-active" : "col",
            toggleSelection: that.toggleSelection.bind(this, item),
            moveSelection: that.moveSelection.bind(this, item),
            key: `day-${item.day}-${item.col}-${item.row}`
          }
          return <Cell {...props} {...this.state} />
        } )}
      </Row>
    )
  }
}

