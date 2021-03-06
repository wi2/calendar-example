"use strict";
import React from 'react'

export default class extends React.Component {
  _onChange (lbl, e) {
    e.preventDefault();
    this.props.filterBy(lbl, e.target.value);
  }
  render() {
    return (
      <tr>
        <th />
        <th />
        {this.props.item.map( it => {
          return (
            <th key={it.label}>
              <input type="text" onChange={this._onChange.bind(this, it.label)} />
            </th>
          );
        })}
      </tr>
    );
  }
}
