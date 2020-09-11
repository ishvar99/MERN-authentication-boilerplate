import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../../Components/Home/Home"
import Register from "../../Components/Register/Register"
import Login from "../../Components/Login/Login"
const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
    </Switch>
  )
}
export default Routing
