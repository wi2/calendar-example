module.exports = function(req, res, next) {
  // console.log(req.allParams())
  var dateStart = new Date(req.param('start'))
    , dateEnd = new Date(req.param('end'))
    , query = {
        room: req.param('room'),
        or: [
          {start: { '>=': dateStart, '<=': dateEnd }},
          {end: { '>=': dateStart, '<=': dateEnd }},
          {start: { '<=': dateStart }, end: { '>=': dateEnd }}
        ]
      };

  switch(req.method) {
    case 'PUT': _.extend(query, { id: {'!' : req.param('id')} })
      break;
    case 'POST': break;
    default: next(); return; break;
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
