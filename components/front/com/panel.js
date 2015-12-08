"use strict";

import React, {Component} from 'react';
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
  format(dateStr, ifEnd) {
    let date = new Date(dateStr);
    if (ifEnd)
      return this.agenda.getEndDate(date).toLocaleString()
    else
      return date.toLocaleString()
  }
  formatGetEndDate(dateStr) {
    let date = new Date(dateStr)
    return this.agenda.getEndDate(dateStr)
  }

  render() {
    let events = this.agenda.getEventsByDate(this.props.date, this.props.events, this.props.view !== "month")
    return (
      <div className="agenda-panel" style={{right: this.props.right}} key="panel">
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
                <div className="panel-event-date">{this.format(evt.start)} to {this.format(evt.end, true)}</div>
                {evt.member && <div className="panel-event-member">reserved by {evt.member.username}</div>}
                <div className="panel-event-title">{evt.title}</div>
                <p className="panel-event-content">{evt.content}</p>
              </div>
            )}
          )}

        </div>
    )
  }
}
