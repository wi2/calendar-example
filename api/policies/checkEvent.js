module.exports = function(req, res, next) {
  var query = {
    room: req.param('room'),
    or: [
      {
        start: {
          '<=': new Date(req.param('start'))
        },
        end: {
          '>=': new Date(req.param('start'))
        }
      }, {
        start: {
          '<=': new Date(req.param('end'))
        },
        end: {
          '>=': new Date(req.param('end'))
        }
      }
    ]
  };

  switch(req.method) {
    case 'PUT': _.extend(query, { id: {'!' : req.param('id')} })
      break;
    case 'POST': break;
    default: return next(); break;
  }

  Event
    .count(query)
    .then( count => {
      if (count)
        res.json({ error: "Check another date for this reservation." })
      else
        next()
    })


};
