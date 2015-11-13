"use strict";
import React from 'react'


export default class extends React.Component {
  render() {
    let item = this.props.item
      , type = this.props.type
      , ifBinary = (type === 'binary')
      , ifBoolean = (type === 'boolean')
      , anythingElse = !(ifBinary || ifBoolean)
    return (
      <div>
        {item && ifBinary && <ContentBinary item={item} />}
        {item && ifBoolean && <ContentBoolean item={item} />}
        {item && anythingElse && item.toString()}
      </div>
    );
  }
}

class ContentBinary extends React.Component {
  render() {
    let item = this.props.item;
    let cond = item.split("/")[0] === 'data:image'
    return (
      <span>
        {item && <img src={item||'data:image/png;base64,null'} />}
        {!item && <a href={item}>Download</a>}
      </span>
    );
  }
}


class ContentBoolean extends React.Component {
  render() {
    let item = this.props.item;
    return <span>{item ? 'true' : 'false'}</span>
  }
}



