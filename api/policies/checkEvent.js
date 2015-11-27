module.exports = function(req, res, next) {
  // console.log(req.allParams())
  var countMax = 0;
  switch(req.method) {
    case 'PUT': countMax = 1; break;
    default: return next(); break;
  }

  Event
    .count({
      room: req.param('room'),
      or: [
        {
          start: {
            '>=': new Date(req.param('start')),
            '<=': new Date(req.param('end'))
          }
        }, {
          end: {
            '>=': new Date(req.param('start')),
            '<=': new Date(req.param('end'))
          }
        }
      ]
    })
    .then( count => {
      if (count > countMax)
        res.json({ error: "Check another date for this reservation." })
      else
        next()
    })


};
