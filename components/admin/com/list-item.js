"use strict";
import React from 'react'
import {Link} from 'react-router'
import Content from './list-item-content'

export default class extends React.Component {
  render() {
    let item = this.props.item;
    let url = "/"+this.props.urlParams.identity+"/"+this.props.urlParams.id;
    return (
      <tr key={item.id}>
        <td><Link to={url} params={this.props.urlParams}>Edit</Link></td>
        <td><Link to={`${url}/delete`} params={this.props.urlParams}>Delete</Link></td>
          {this.props.fItem.map( it => {
            return <td key={it.label}><Content item={item[it.label]} type={it.type} /></td>
          } )}
      </tr>
    );
  }
}
