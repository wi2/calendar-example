"use strict";

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import _ from 'lodash';
import {RenderForm, Form, ChoiceField, MultipleChoiceField, CheckboxSelectMultiple, RadioSelect} from 'newforms'
import BootstrapForm, {Container, Row, Col, Field} from 'newforms-bootstrap'
import DatePicker from './date-picker'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.createForm()
  }

  createForm() {
    let MyForm = Form.extend({
      room: MultipleChoiceField({
        widget: CheckboxSelectMultiple,
        choices: this.props.rooms.map(r => [r.id, r.name]),
        initial: this.props.rooms.map(r => r.id),
        widgetAttrs: {
          onFocus: this._onFocus.bind(this),
          onBlur: this._onSubmit.bind(this)
        }
      })
    })
    this.form = new MyForm({
      controlled: true,
      onChange: this.onFormChange.bind(this),
      validation: 'auto'
    })
  }
  onFormChange() {
    this.forceUpdate()
  }

  _onFocus(e) {
    e.preventDefault();
    setTimeout(() => e.target.blur(), 50);
  }
  _onSubmit(e) {
    if (e) e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate()) {
      let cleanedData = _.clone(form.cleanedData)
      this.props.onChange(cleanedData)
    }
  }
  toggle() {
    this.setState({show: !this.state.show})
  }

  render() {
    return (
      <form className="agenda-filter">
        {!this.state.show && <a onClick={this.toggle.bind(this)} className="btn">Filter</a>}
        {this.state.show && <Motion defaultStyle={{opacity: 0, height:0}} style={{opacity: spring(1), height: 50}}>
          {value =>
          <div style={value}>
            <RenderForm form={this.form} ref={ref => this.mForm = ref}>
              <Row><Field name="room" /></Row>
            </RenderForm>
          </div>}
        </Motion>}
      </form>
    )
  }}
