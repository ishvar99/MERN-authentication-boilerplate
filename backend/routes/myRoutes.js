const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ msg: "Node Server" })
})
module.exports = router
