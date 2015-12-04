module.exports = function(req, res, next) {

  if (req.method === 'GET')
    return next();

  var currentUserWithRole
    , dateStart = new Date(req.param('start'))
    , dateEnd = new Date(req.param('end'))
    , query = {
        room: req.param('room'),
        or: [
          {start: { '>=': dateStart, '<=': dateEnd }},
          {end: { '>=': dateStart, '<=': dateEnd }},
          {start: { '<=': dateStart }, end: { '>=': dateEnd }}
        ]
      };

  User
    .findOneById(req.session.passport.user)
    .populate('role')
    .then( user => {//check user role
      if (!user)
        return res.json({ error: "You are not a member" });
      currentUserWithRole = user

      if (req.method === 'POST') {
        req.body.member = req.session.passport.user;
        Event.count(query).then( count => {//before create, check if an event already exist
          if (count)
            return res.json({ error: "Check another date for this reservation." });
          else
            return next();
        })
      } else
        Event
          .findOneById(req.param('id'))
          .then( evt => {//check if you can update or delete this event
            if ( evt && (evt.member == req.session.passport.user || currentUserWithRole.role.name == 'admin') )
              return Event.count( _.extend({'!' : req.param('id')}, query) )
            else
              return { error: "You are not authorize." };
          })
          .then( count => {//check if an event already exist
            if (count.error)
              return res.json(count);
            else if (count > 0)
              return res.json({ error: "Check another date for this reservation." });
            else
              return next()
          })
    })

};
