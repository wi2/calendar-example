module.exports = function(req, res, next) {

  User.count().then(count => {
    if (count === 0) {
      Role.create({name: "admin"})
      .then( role => {
        return User.create({
          username: "admin",
          email: "michael.gaeta@af83.com",
          password: "passpass",
          role: role.id
        })
      })
      .then( user => { next(); })
    } else
      next()
  })

};