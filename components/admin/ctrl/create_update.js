"use strict";

import React, {Component} from 'react'
import AdminComponent from './admin'
import AdForm from '../com/form'


class FormItem extends AdminComponent {
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
    this.setState({loading: true});
    let id = this.props.params ? this.props.params.id : this.props.id
    let url = id ? "/" + id : "/new";
    if (typeof io !== "undefined") {
      io.socket.get(this.props.root||'/admin' + "/" + identity + url, ( res => {
        res.loading = false;
        if (this.props.models && this.props.models[this.identity])
          res.modelForm = this.props.models[this.identity]
        this.setState({...res});
      }));
    }
  }

  multipart(data, binaries, cb) {
    if (binaries.length) {
      let tmp = binaries.pop();
      if (data[tmp.label] instanceof Blob) {
        let reader = new FileReader();
        reader.onload = (upload) => {
          data[tmp.label] = upload.target.result;
          this.multipart(data, binaries, cb);
        };
        reader.readAsDataURL(data[tmp.label]);
      } else
        this.multipart(data, binaries, cb);
    } else
      cb(data);
  }
  saving(data, url, cb) {
    if (typeof io !== "undefined") {
      if (typeof url === 'function') {
        cb = url;
        url = "";
      }
      let fItem;
      if (this.state && this.state.formItem)
        fItem = this.state.formItem;
      var binaries = fItem.filter( a => { return a.type === 'binary' } );
      this.multipart(data, binaries, result => {
        if (url === "")
          io.socket.post("/" + this.identity, result, ( res => { if (cb) cb(res); }))
        else
          io.socket.put("/" + this.identity + url, result, ( res => { if (cb) cb(res); }))
      });
    }
  }
  onSave(data) {}
  render() {
    if (!this.state) {
      let props = {...this.props}
      if (this.props.models && this.props.models[this.identity])
        props.modelForm = this.props.models[this.identity]
      return <AdForm onSave={this.onSave.bind(this)} {...props} />
    } else if (this.state.loading) {
      return <form />
    }

    return <AdForm onSave={this.onSave.bind(this)}
                  {...this.state}
                  modelForm={this.props.models[this.identity]} />
  }
}

export class Update extends FormItem {
  onSave(data) {
    this.saving(data, "/" + this.props.params.id, res => {
      this.props.history.pushState(null, this.identity, {force: true});
    });
  }
}

export class Create extends FormItem {
  onSave(data) {
    this.saving(data, res => {
      this.props.history.pushState(null, this.identity, {force: true});
    });
  }
}
