"use strict";

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import DatePicker from './date-picker';
import Agenda from '../lib/agenda'

export default class extends Component {
  constructor(props) {
    super(props)
    this.agenda = new Agenda()
  }
  _onSelect(val) {
    this.props.onSelectDate(val);
  }
  format(dateStr) {
    let date = new Date(dateStr);
    return date.toLocaleString()
  }

  render() {
    let events = this.agenda.getEventsByDate(this.props.date, this.props.events, this.props.view !== "month")
    return (
      <Motion defaultStyle={{x: this.props.defaultRight}} style={{x: spring(this.props.right)}}>
        {value =>
        <div className="agenda-panel" style={{right: value.x}} key="panel">
          {this.props.date &&
            <DatePicker view="month"
                        year={this.props.date.getFullYear()}
                        month={this.props.date.getMonth()}
                        day={this.props.date.getDate()}
                        except={this.props.except}
                        onSelect={this._onSelect.bind(this)} />}

          {events.map(evt => {
            return (
              <div className="panel-event" key={"evt"+evt.id} style={{background: evt.room.color} }>
                <div className="panel-event-date">{this.format(evt.start)} to {this.format(evt.end)}</div>
                <div className="panel-event-title">{evt.title}</div>
                <p className="panel-event-content">{evt.content}</p>
              </div>
            )}
          )}

        </div>}
      </Motion>
    )
  }
}
