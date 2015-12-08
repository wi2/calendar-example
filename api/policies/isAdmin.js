module.exports = function(req, res, next) {

  User
    .findOneById(req.session.passport.user)
    .populate('role')
    .then( user => {//check user role
      if (!user)
        return res.json({ error: "You are not a member" });
      else
        if (user.role.name == 'admin')
          next()
        else
          return res.json({ error: "You are not an admin" });
    })

};
