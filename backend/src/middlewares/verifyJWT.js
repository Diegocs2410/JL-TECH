const jwt = require("jsonwebtoken")
require("dotenv").config()
const userModel = require("../models/users.model")

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ ok: false, message: "You has not been authorized 1" })
  }
  const token = req.headers.authorization.split(" ")[1] //taking the second parameter from authorization header
  if (token === null) {
    return res
      .status(401)
      .json({ ok: false, message: "You has not been authorized 2" })
  }
  jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
    if (error)
      return res
        .status(401)
        .json({ ok: false, message: "You has not been authorized 3" + error })
    // if user exists get id
    const { id } = payload
    // Now found an user in the model
    const user = await userModel.findById({ _id: id })
    if (!user)
      return res
        .status(401)
        .json({ ok: false, message: "You has not been authorized 4" })
    // if User exists then next with the route, this it's a middleware
    req.userid = payload.id
    next()
  })
}
module.exports = verifyToken
