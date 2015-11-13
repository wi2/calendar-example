"use strict";

import React, {Component} from 'react'
import AdminComponent from './admin'
import {RenderForm} from 'newforms'
import BootstrapForm, {Container, Row} from 'newforms-bootstrap'

import generateForm from '../lib/make-form'


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

  saving(data, url, cb) {
    if (typeof io !== "undefined") {
      if (typeof url === 'function') {
        cb = url;
        url = "";
      }
      this.multipart(data, binaries, result => {
        io.socket.delete("/" + this.identity + url, result, ( res => { if (cb) cb(res); }))
      });
    }
  }
  makeForm(formItem=this.props.formItem, data=this.props.item) {
    return generateForm(formItem, data)
  }
  render() {
    if (!this.state)
      return <div />

    var mForm = this.makeForm()
      , item = this.state.item
    return (
      <div>
        <div className="text-center">
          <h1>Are you sure you want delete this {this.identity} ?</h1>
          <hr />
          <button type="button" className="btn btn-lg btn-warning">Yes</button>
          <button type="button" className="btn btn-lg btn-default">No</button>
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

