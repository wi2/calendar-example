"use strict";

import React, {Component} from 'react'
import AdminComponent from './admin'
import AdList from '../com/list'

export default class extends AdminComponent {
  // state = {
  //   contain: {},
  //   sort: this.props.sort||['id', 'ASC'],
  //   skip: this.props.skip||0,
  //   limit: this.props.limit||30
  // }
  componentWillMount() {
    this.setState({
      contain: {},
      sort: this.props.sort||['id', 'ASC'],
      skip: this.props.skip||0,
      limit: this.props.limit||30
    })
    if (!this.props.items || this.props.location.query.force) {
      this.getItems(this.props.params.identity||this.props.identity);
    }

  }
  componentDidUpdate(props, state) {
    if (this.props.location.pathname !== props.location.pathname) {
      this.getItems(this.props.params.identity);
    }
  }
  componentWillUpdate(props, state) {
    if (state.doChange && state.doChange !== this.state.doChange) {
      this.getItems(props.params.identity, {
        contain: state.contain||{},
        sort: state.sort.join(" ")||"id ASC",
        limit: props.limit||30,
        skip: state.skip||0
      });
      this.setState({doChange: false});
    }
  }
  getItems(identity=this.props.identity||this.props.params.identity, params) {
    if (typeof io !== "undefined") {
      params = params||{
        contain: this.state ? this.state.contain:{},
        sort: this.state ? this.state.sort.join(" "):"id ASC",
        limit: this.state ? this.state.limit:30,
        skip: this.state ? this.state.skip:0,
      };
      io.socket.get(this.props.root||'/admin' + "/" + identity, params, ( res => {
        this.setState(res)
      }));
    }
  }
  filterBy(lbl, val) {
    let contain = this.state.contain;
    contain[lbl] = {'contains': val};
    this.setState({contain, doChange: true});
  }
  sortBy(lbl) {
    let sort = this.state.sort;
    let direction = 'ASC';
    if (sort[0] === lbl)
      direction = (sort[1] === 'ASC') ? 'DESC' : 'ASC';
    this.setState({
      doChange: true,
      sort: [lbl, direction]
    });
  }
  changePage(num) {
    let skip = (num-1) * (this.props.limit||this.state.limit);
    this.setState({
      doChange: true,
      skip: skip
    });
  }
  render() {

    return (
      <AdList items={[]}
          {...this.props}
          {...this.props.params}
          {...this.state}
          changePage={this.changePage.bind(this)}
          sortBy={this.sortBy.bind(this)}
          filterBy={this.filterBy.bind(this)} />
    );
  }
}
