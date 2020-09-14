import React, { Fragment, useEffect } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import Backdrop from "../../Components/Backdrop/Backdrop"
import { useSelector, useDispatch } from "react-redux"

const Header = () => {
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated } = auth
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <div className="Header">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="p-3"
        >
          <Link to="/">
            <Navbar.Brand>E-commerce Website</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <li className="nav-item ">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {!user ? (
                <Fragment>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Hello, {user.name.split(" ")[0]}
                    </Link>
                  </li>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}

Header.propTypes = {}

export default Header
