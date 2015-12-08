"use strict";

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import _ from 'lodash';
import DatePicker from './date-picker'
import TimePicker from './time-picker'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: this.props.year,
      month: this.props.month,
      day: this.props.day,
      hour: this.props.hour,
      minute: this.props.minute,
      name: this.props.name,
      except: this.props.except||[],
      type: "date",
      decal: this.props.decal||0
    }
  }
  _onSelectDate(val) {
    this.setState( _.extend({type: "hour"}, val) )
  }
  _onSelectTime(val) {
    this.setState( _.extend({type: "date"}, val) )
    let date = new Date(this.state.year, this.state.month, this.state.day, val.hour, val.minute)
      , current = _.extend(this.state, val, {date})
    this.props.onSelect(current)
  }
  render() {

    return (
      <Motion defaultStyle={{alpha: 0}} style={{alpha: spring(1)}}>
      {value =>
        <div className="date-time-picker" style={{opacity: value.alpha}}>
          {this.state.type === "date"
            && <DatePicker {...this.state} view="month" onSelect={this._onSelectDate.bind(this)}  />}
          {this.state.type === "hour"
            && <TimePicker {...this.state} onSelect={this._onSelectTime.bind(this)} />}
        </div>}
      </Motion>
    )
  }
}
