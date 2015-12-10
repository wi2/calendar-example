"use strict";

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import {Vertical, Row, Cell} from './calendar-utils';

class ViewDefault extends Component {
  constructor(props) {
    super(props)
    this.state = { width: this.props.width, height: this.props.height, cellClassName: "agenda-vertical" };
  }

  setDimension(width, height, cellClassName='') {
    this.setState({width, height, cellClassName});
  }

  prepareRender(withHour=false, withMinute=false) {
    let events
      , agenda = this.props.agenda
      , week = this.props.week
    if (this.props.agenda && this.props.events) {
      events = agenda.tetris(agenda.getEvents(week, this.props.events, withHour, withMinute))
    }
    let selection = {
      s: this.props.selectionStart.date,
      e: this.props.selectionEnd.date
    }
    return {events, week, selection}
  }

  toggleSelection(val) {
    this.props.toggleSelection(val)
  }
  moveSelection(val) {
    this.props.moveSelection(val)
  }
  onSelect(val, e) {
    e.preventDefault()
    this.props.onSelect(val)
  }
  onMouseDown(val, e) {
    e.preventDefault()
    this.props.toggleSelection({date: new Date(val.start)}, val)
    let that = this
    var eventListener = function() {
      that.props.toggleSelection()
      document.body.removeEventListener('mouseup',  eventListener);
    };
    document.body.addEventListener('mouseup',  eventListener);
  }

  getMoveUp() {
    return this.props.agenda.getMoveUp(4*this.props.height/(24*2))
  }

}

export class Week extends ViewDefault {
  componentDidMount() {
    this.setDimension(this.props.width/7, this.props.height/(24*2), "agenda-vertical")
  }
  componentWillReceiveProps(props) {
    this.setDimension(this.props.width/7, this.props.height/(24*2), "agenda-vertical")
  }

  style(evt, opacity=0.9) {
    let {room, cell} = evt
      , width = this.props.height/(24*2);
    return {
      opacity,
      left: (evt.cell.line + 1.5) * 18 + 'px',
      top: `${cell.start * width}px`,
      width: `${(cell.end - cell.start + 1) * width}px`,
      transform: 'rotate(90deg)',
      transformOrigin: 'left top 0',
      background: room.color||'grey'
    }
  }

  render() {
    let agenda = this.props.agenda
      , {events, week, selection} = this.prepareRender(true, true)
    return (
      <Vertical className={this.state.cellClassName} style={{marginTop: this.getMoveUp()+"px"}}>
        {week.map((item) => {
          let cond = (item.date >= selection.s && item.date <= selection.e)
                      || (!this.props.editor && this.props.current && agenda.compare(new Date(item.date), new Date(this.props.current.year, this.props.current.month, Math.abs(this.props.current.day), this.props.current.hour), true ) )
          let props = {
            value: item.minute ? "  " + item.minute : item.hour + "h ",
            className: cond ? "col-day col-day-active" : "col-day",
            toggleSelection: this.toggleSelection.bind(this, item),
            moveSelection: this.moveSelection.bind(this, item),
            disabled: item.disabled,
            key: `hour-${item.hour}-{item.minute}-${item.row}-${item.col}`
          }
          if (cond) {
            props.color = this.props.selectionColor
          }
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return <Cell {...props} {...this.state} />
        })}
        {events && events.map((evt, i) =>
          <div className="event" style={this.style(evt)}
                onMouseDown={this.onMouseDown.bind(this, evt)}
                onClick={this.onSelect.bind(this, evt)} key={`event-${evt.id}-${i}`}>{evt.title}</div>
        )}
      </Vertical>
    )
  }
}

export class Day extends Week {
  componentDidMount() {
    this.setDimension(this.props.width, this.props.height/(24*2), "agenda-vertical agenda-vertical-row")
  }
  componentWillReceiveProps(props) {
    this.setDimension(this.props.width, this.props.height/(24*2), "agenda-vertical agenda-vertical-row")
  }

  style(evt, opacity) {
    let eventWidth = 180
      , {room, cell} = evt
      , width = this.props.height/(24*2);
    return {
      opacity,
      top: `${cell.start * width}px`,
      left: (evt.cell.line - 0.5) * eventWidth + 'px',
      height: `${(cell.end - cell.start + 1) * width}px`,
      width: eventWidth + 'px',
      background: room.color||'grey'
    }
  }
}

export class Month extends ViewDefault {
  componentDidMount() {
    this.setDimension(this.props.width/7, this.props.height/7)
  }
  componentWillReceiveProps(props) {
    this.setDimension(this.props.width/7, this.props.height/7)
  }

  style(evt, opacity=0.9) {
    let {room, cell} = evt
      , width = this.state.width
    return {
      opacity,
      top: (evt.cell.line + 0.5) * 12 + 'px',
      left: `${cell.start * width}px`,
      width: `${(cell.end - cell.start + 1) * width}px`,
      background: room.color||'grey'
    }
  }

  render() {
    let agenda = this.props.agenda
    let {events, week, selection} = this.prepareRender()
      , that = this
    return (
      <Row>

        {week.map((item) => {
          let cond = (item.date >= selection.s && item.date <= selection.e)
                      || (!this.props.editor && this.props.current && agenda.compare(new Date(item.date), new Date(this.props.current.year, this.props.current.month, Math.abs(this.props.current.day)) ) )
            , props = {
              value: item.day,
              className: cond ? "col col-active" : "col",
              toggleSelection: that.toggleSelection.bind(this, item),
              moveSelection: that.moveSelection.bind(this, item),
              disabled: item.disabled,
              key: `day-${item.day}-${item.col}-${item.row}`
            }
          if (cond) {
            props.color = this.props.selectionColor
          }
          if (item.disabled) {
            delete props.toggleSelection;
            delete props.moveSelection;
            props.className = "col-day col-day-disabled";
          }
          return <Cell {...props} {...this.state} />
        } )}

        {events && events.map((evt, i) =>
          <div className="event" style={this.style(evt)}
                onMouseDown={this.onMouseDown.bind(this, evt)}
                onClick={this.onSelect.bind(this, evt)} key={`event-${i}`}>{evt.title}</div>
        )}

      </Row>
    )
  }
}

