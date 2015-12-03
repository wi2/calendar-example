module.exports = function(req, res, next) {

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
    case 'PUT':
      query.id = {'!' : req.param('id')}
      query.member = req.session.passport.user;//only user was created this event can update this
      req.body.member = req.session.passport.user;
      break;
    case 'POST':
      req.body.member = req.session.passport.user;
      break;
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
