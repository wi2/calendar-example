"use strict";

import React, {Component} from 'react';
import {DatePicker} from './date-picker'


export default class extends Component {
  constructor(props) {
    super(props)
  }
  _onSelect(val) {
    console.log(val)
  }

  render() {
    return (
      <div className="agenda-panel">
        {this.props.date &&
          <DatePicker view="month"
                      year={this.props.date.getFullYear()}
                      month={this.props.date.getMonth()}
                      day={this.props.date.getDate()}
                      except={this.props.except}
                      onSelect={this._onSelect.bind(this)} />}
        <hr />
        {Object.keys(this.props).map(key => <div key={key}>{this.props[key].toString()}</div>)}
      </div>
    )
  }
}
