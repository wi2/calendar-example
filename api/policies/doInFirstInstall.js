module.exports = function(req, res, next) {
  User.count().exec((err, count) => {
    if (count === 0) {
      Role.create({name: "admin"}).exec((err, role) => {
        User.create({
          username: "admin",
          email: "michael.gaeta@af83.com",
          password: "passpass",
          role: role.id
        })
      })
    }
  })
  next();
};
