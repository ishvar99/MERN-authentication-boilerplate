const { clearHash } = require("../services/cache")

module.exports = async (req, res, next) => {
  clearHash(req.currentUser.id)
  next()
}
