import { BrowserRouter as Router } from "react-router-dom"
import React from "react"
import "./App.css"
import Routing from "./Components/Routing/Routing"
import Header from "./Components/Header/Header"
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routing />
      </Router>
    </div>
  )
}

export default App
