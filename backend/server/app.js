require("dotenv").config()
require("colors")
const {
  data: { NODE_ENV, DEV_PORT },
} = require("../config/keys")
const express = require("express")
let app = express()
const morgan = require("morgan")
const path = require("path")
if (NODE_ENV == "development") {
  app.use(morgan("dev"))
}
const myRoutes = require("../routes/myRoutes")
const connectDB = require("../database/db")
//connect to database
connectDB()
//routes middleware
app.use("/api", myRoutes)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend", "build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "build", "index.html"))
  })
}
const server = app.listen(process.env.PORT || DEV_PORT, () => {
  console.log(
    `Server is running in ${NODE_ENV} mode on PORT ${
      process.env.PORT || DEV_PORT
    }`.bold
  )
})
// Unhandled Expections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red)
  //close and exit server
  server.close(() => process.exit(1))
})
