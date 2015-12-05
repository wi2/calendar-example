"use strict";

import React, {cloneElement, Component} from 'react'
import {RenderForm} from 'newforms'
import BootstrapForm, {Container, Row} from 'newforms-bootstrap'

import generateForm from '../lib/make-form'

export default class extends Component {
  componentWillMount() {
    this.makeForm(this.props.formItem)
  }
  componentWillReceiveProps(props) {
    if (this.mForm) delete this.mForm
  }

  generateForm(formItem=this.props.formItem, data=this.props.item) {
    return generateForm(formItem, data)
  }
  makeForm(formItem=this.props.formItem, data=this.props.item) {
    return this.generateForm(formItem, data)
  }

  _onSubmit(e) {
    e.preventDefault();
    let form = this.mForm.getForm()
    if(form.validate())
      this.props.onSave(form.cleanedData)
  }
  render() {
    var mForm = this.makeForm()
    if (this.props.modelForm)
      if (typeof this.props.modelForm === 'object')
        return (
          <form onSubmit={this._onSubmit.bind(this)} encType="multipart/form-data">
            {mForm && this.props.formItem &&
            <RenderForm form={mForm} ref={(ref) => this.mForm = ref}>
              {cloneElement(this.props.modelForm)}
            </RenderForm>}
          </form>
        );
      else {
        let MF = this.props.modelForm
        return <MF {...this.props} />
      }

    return (
      <form onSubmit={this._onSubmit.bind(this)} encType="multipart/form-data">
        <h1>{this.props.identity}</h1>
        <hr />
        <p className="text-right">
          <button className="btn btn-default">Save</button>
        </p>
        {mForm && this.props.formItem &&
        <RenderForm form={mForm} ref={(ref) => this.mForm = ref}>
          <BootstrapForm form={new mForm()}/>
        </RenderForm>}
      </form>
    );
  }
}
