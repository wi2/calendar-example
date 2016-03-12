var crypto = require('crypto')

module.exports = function(req, res, next) {
  User.count().exec((err, count) => {
    // if (count === 0) {
      console.log("Create Role Admin")
      Role.create({name: "admin"}).exec((err, role) => {
        const profile = {
          username: "administrator",
          email: "admin@example.com",
          password: "password",
          role: role.id
        }
        console.log(role, 'was created')
        console.log("Create User Admin")
        User.create(profile, (err, user) => {
          if (err) return next(err)
          var token = crypto.randomBytes(48).toString('base64')
          Passport.create({
            protocol    : 'local',
            password    : profile.password,
            user        : user.id,
            accessToken : token
          }, (err, passport) => {
            console.log("Admin registering is finish")

          })
        })
      })
    // }
  })
  next()

};
