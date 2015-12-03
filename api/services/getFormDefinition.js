

module.exports = function(def) {
  var definition = sails.models[def].definition;
  //Promise
  return new Promise( (resolve, reject) => {
    let myKeys = Object.keys(definition).filter( k => {
      if (['createdAt','updatedAt'].indexOf(k) === -1)
        return k
    })
    myKeys.unshift(myKeys.pop());//id in first position
    Promise.all(myKeys.map( assoc => { return prepare(def, definition[assoc], assoc); }) )
    .then( results => { resolve(results); } )
    .catch( err => { reject(err); } )
  });
};

function prepare(def, data, attr) {
  var validator = sails.models[def]._validator.validations[attr]
    , res = new Object(_.clone(validator));

  res.label = attr;
  res.input = data.type;
  switch(data.type) {
    case 'array': res.input = 'checkbox'; break;
    case 'json': res.input = 'text'; break;
  }
  //don't use for <form>
  switch(attr) {
    case 'id':
    case 'updatedAt':
    case 'createdAt': res.disabled = true; break;
  }

  if (data.defaultsTo)
    res.defaultsTo = data.defaultsTo;

  if (validator) {
    if (validator.email){
      res.input = 'email';
      res.email = validator.email;
    }
    if (validator.in) {
      res.in = validator.in;
      res.input = 'choice';
    }

    if (validator.url)
      res.input = 'url';
    else if (validator.urlish)
      res.input = 'urlish';
    else if (validator.alphanumericdashed)
      res.input = 'slug';
    else if (validator.ipv4)
      res.input = 'ipv4';
    else if (validator.ipv6)
      res.input = 'ipv6';
    else if (validator.image)
      res.input = 'image';
    else if (validator.regex) {
       res.input = 'regex';
       res.pattern = res.regex.toString();
    }

    if (validator.min)
      res.minValue = validator.min;
    if (validator.max)
      res.maxValue = validator.max;
  }

  res.required = validator && validator.required ? validator.required : false;

  //Promise
  return new Promise( (resolve, reject) => {
    console.log(data)
    // if it's a model association
    if (data.alias && data.model)
      sails.models[data.model].find()
      .then( list => {
        res.input = 'choice';
        res.in = list.map( item => {
          let key = 0;
          while(typeof item[Object.keys(item)[key]] !== 'string') { key++; }
          return [item.id, item[Object.keys(item)[key]]];
        });
        resolve(res);
      } )
      .catch( err => { reject(err); } )
    else
      resolve(res);
  });
}
