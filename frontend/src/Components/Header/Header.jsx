import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Loader } from "../../Components/Loader/Loader"
const Header = (props) => {
  return (
    <>
      {false ? <Loader /> : null}
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
              {true ? (
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
                      Hello, Ishan
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      Profile
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
