"use strict";

import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import AdminComponent from './admin'

export default class extends AdminComponent {
  componentWillMount() {
    this.identity = this.props.identity
    if (this.props.params && this.props.params.identity)
      this.identity = this.props.params.identity
    this.getItem(this.identity);
  }

  componentDidUpdate(props, state) {
    if (this.props.location.pathname !== props.location.pathname) {
      this.getItem(this.props.params.identity);
    } else if (this.props.params.identity !== props.params.identity) {
      this.getItem(this.props.params.identity);
    }
  }

  getItem(identity) {
    this.identity = identity
    let id = this.props.params ? this.props.params.id : this.props.id
    let url = "/" + id + "/delete";
    if (typeof io !== "undefined") {
      io.socket.get(this.props.root||'/admin' + "/" + identity + url, ( res => {
        this.setState({...res});
      }));
    }
  }

  _onSaving() {
    let id = this.props.params ? this.props.params.id : this.props.id
    io.socket.delete("/" + this.identity + "/" + id, {}, ( res => {
      browserHistory.push("/admin/" + this.identity);
    }))
  }
  _onCancel() {
    browserHistory.push("/admin/" + this.identity);
  }
  render() {
    let item = this.state ? this.state.item : {}
    return (
      <div>
        <div className="text-center">
          <h1>Are you sure you want delete this {this.identity} ?</h1>
          <hr />
          <button type="button" onClick={this._onSaving.bind(this)} className="btn btn-lg btn-warning">Yes</button>
          <button type="button" onClick={this._onCancel.bind(this)} className="btn btn-lg btn-default">No</button>
          <hr />
        </div>
        {item && item.id && Object.keys(item).map((k) => {
          return <Item key={k} label={k} value={item[k]} />
        })}
      </div>
    )
  }
}

class Item extends Component {
  render() {
    let cond = ['string', 'number'].indexOf(typeof this.props.value) === -1
    return (
      <div className="row">
        <div className="col-md-3 text-right">
          <strong>{this.props.label}:</strong>
        </div>
        <div className="col-md-9">
          {!cond && <span>{this.props.value}</span>}
          {cond && <span>{this.props.value.toString()}</span>}
        </div>
      </div>
    )
  }
}

