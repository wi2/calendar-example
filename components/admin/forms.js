"use strict";

import React, {Component} from 'react';
import _ from 'lodash';
import AdForm from './com/form'
import {RenderForm, RadioSelect} from 'newforms'
import {Container, Row, Field} from 'newforms-bootstrap'

export class exception extends AdForm {
  constructor(props) {
    super(props)
    this.state = {
      type: 'day'
    }
  }

  _onFocus(e) {
    e.preventDefault();
    setTimeout(() => e.target.blur(), 50);
  }
  _onBlur(e) {
    if (e) e.preventDefault();
    let form = this.mForm.getForm()
    let cleanedData = _.clone(form.cleanedData)
    this.setState({type: cleanedData.type})
  }

  makeForm(formItem=this.props.formItem, data=this.props.item) {
    formItem[3].widget = RadioSelect
    formItem[3].widgetAttrs = {
      onFocus: this._onFocus.bind(this),
      onBlur: this._onBlur.bind(this)
    }
    return this.generateForm(formItem, data)
  }

  render() {
    var mForm = this.makeForm()
    return (
      <form onSubmit={this._onSubmit.bind(this)} encType="multipart/form-data">
        {mForm && this.props.formItem &&
        <RenderForm form={mForm} ref={(ref) => this.mForm = ref}>
          <Container autoColumns="md">
            <h1>Rôle</h1>
            <hr />
            <p className="text-right">
              <button className="btn btn-default">Save</button>
            </p>
            <Row>
              <Field name="name" md="8"/>
              <Field name="active"/>
            </Row>
            <Row>
              <Field name="description"/>
            </Row>
            <Row>
              <Field name="type"/>
            </Row>
            {  ((this.state.type === 'dates' || this.state.type === 'datesHour')
              && <Row><Field name='startDate' /><Field name='endDate' /></Row>)
            || (this.state.type === 'hours'
              && <Row><Field name='startHour' /><Field name='endHour' /></Row>)
            || ((this.state.type === 'day' || this.state.type === 'date')
              && <Row><Field name={this.state.type} /></Row>)}
          </Container>
        </RenderForm>}
      </form>

    )
  }
}

export const user = (
  <Container autoColumns="md">
    <h1>Rôle</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="username" md="8"/>
      <Field name="active"/>
    </Row>
    <Row>
      <Field name="email" md="8"/>
      <Field name="role"/>
    </Row>
  </Container>
);

export const role = (
  <Container autoColumns="md">
    <h1>Rôle</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="name" md="8"/>
      <Field name="active"/>
    </Row>
    <Row>
      <Field name="description"/>
    </Row>
  </Container>
);

export const room = (
  <Container autoColumns="md">
    <h1>Room</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="name" md="8"/>
      <Field name="color"/>
    </Row>
    <Row>
      <Field name="description"/>
    </Row>
  </Container>
);

export const event = (
  <Container autoColumns="md">
    <h1>Event</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="title" md="4"/>
      <Field name="room" md="4"/>
      <Field name="member"/>
    </Row>
    <Row>
      <Field name="content"/>
    </Row>
    <Row>
      <Field name="start" md="6" />
      <Field name="end" />
    </Row>
  </Container>
);

export const image = (
  <Container autoColumns="md">
    <h1>special Image</h1>
    <hr />
    <p className="text-right">
      <button className="btn btn-default">Save</button>
    </p>
    <Row>
      <Field name="title" />
    </Row>
    <Row>
      <Field name="small" md="4" />
      <Field name="medium" md="4" />
      <Field name="big"/>
    </Row>
  </Container>
);
