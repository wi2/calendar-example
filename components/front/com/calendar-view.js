"use strict";

import React, {Component} from 'react';
import {Vertical, Row, Cell} from './calendar-utils'


class ViewDefault extends Component {
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

  style(left, evt) {
    let {room, cell} = evt
      , width = 40

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
    let left = 22
    let events = this.props.agenda.getEvents(this.props.week, this.props.events, true)
    let week = this.props.week
    let selection = {
      s: this.props.selectionStart.date,
      e: this.props.selectionEnd.date
    }
    // let that = this
    return (
      <Vertical>
        {events && events.map((evt, i) => <div className="event"
                                            style={this.style(left+=22, evt)}
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
          return <Cell {...props} />
        })}
      </Vertical>
    )
  }
}


export class Month extends ViewDefault {

  style(top, evt) {
    let {room, cell} = evt
      , width = 100 / 7
    return {
      top: top + 'px',
      left: `${cell.start * width}%`,
      width: `${(cell.end - cell.start + 1) * width}%`,
      background: room.color||'grey'
    }
  }

  render() {
    let top = 0
    let events = this.props.agenda.getEvents(this.props.week, this.props.events)
    let week = this.props.week
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
          return <Cell {...props} />
        } )}
      </Row>
    )
  }
}
