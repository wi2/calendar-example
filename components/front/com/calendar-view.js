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

  tetris(events) {
    if (events.length===0)
      return [];
    events[0].cell.line = 1;

    for (let j=0,len=events.length; j<len; j++) {
      let collision = false;
      let evt = events[j].cell;
      let line = 1;
      while(!evt.line) {
        let evts = events.filter(a => { if (a.cell.line === line) return a; });
        for(let i=0,len=evts.length; i<len; i++) {
          let c = evts[i].cell
          if ( evt.start >= c.start && evt.start <= c.end || evt.end >= c.start && evt.end <= c.end)
            collision = true;
        }
        if (collision) {
          collision = false;
          line++;
        } else {
          evt.line = line
        }
      }
    }
    return events
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

  style(evt) {
    let {room, cell} = evt
      , width = this.props.height/24;

    return {
      opacity: 0.8,
      left: evt.cell.line*12 + 'px',
      top: `${cell.start * width}px`,
      width: `${(cell.end - cell.start + 1) * width}px`,
      transform: 'rotate(90deg)',
      transformOrigin: 'left top 0',
      background: room.color||'grey'
    }
  }

  render() {
    let events
      , week = this.props.week
    if (this.props.agenda && this.props.events) {
      events = this.tetris(this.props.agenda.getEvents(week, this.props.events, true))
    }
    let selection = {
      s: this.props.selectionStart.date,
      e: this.props.selectionEnd.date
    }

    return (
      <Vertical>
        {events && events.map((evt, i) => <div className="event"
                                            style={this.style(evt)}
                                            onClick={this.onSelect.bind(this, evt)}
                                            key={`event-${i}`}>{evt.title}</div> )}
        {week.map((item) => {
          let cond = (item.date >= selection.s && item.date <= selection.e)

          let props = {
            value: item.hour,
            className: cond ? "col-day col-day-active" : "col-day",
            toggleSelection: this.toggleSelection.bind(this, item),
            moveSelection: this.moveSelection.bind(this, item),
            disabled: item.disabled,
            key: `hour-${item.hour}-${item.row}-${item.col}`
          }
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
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

  style(evt) {
    let {room, cell} = evt
      , width = this.state.width

    return {
      opacity: 0.8,
      top: evt.cell.line*12 + 'px',
      left: `${cell.start * width}px`,
      width: `${(cell.end - cell.start + 1) * width}px`,
      background: room.color||'grey'
    }
  }

  render() {
    let numLine = 0
    let week = this.props.week
    let events = this.tetris(this.props.agenda.getEvents(week, this.props.events))

    let selection = {
      s: this.props.selectionStart.date,
      e: this.props.selectionEnd.date
    }
    let that = this
    return (
      <Row>
        {events && events.map((evt, i) => <div className="event"
                                            style={this.style(evt)}
                                            onClick={this.onSelect.bind(this, evt)}
                                            key={`event-${i}`}>{evt.title}</div> )}
        {week.map((item) => {
          let cond = (item.date >= selection.s && item.date <= selection.e)
          let props = {
            value: item.day,
            className: cond ? "col col-active" : "col",
            toggleSelection: that.toggleSelection.bind(this, item),
            moveSelection: that.moveSelection.bind(this, item),
            disabled: item.disabled,
            key: `day-${item.day}-${item.col}-${item.row}`
          }
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return <Cell {...props} {...this.state} />
        } )}
      </Row>
    )
  }
}

