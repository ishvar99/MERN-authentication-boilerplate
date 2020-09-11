import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Loader from "../../Components/Loader/Loader"
import "./Login.scss"
const Login = (props) => {
  // const [loading, setLoading] = useState()
  const [inputvalue, setinputvalue] = useState({
    email: "",
    password: "",
  })
  const [errorMsg, seterrorMsg] = useState({
    status: false,
    color: "",
    msg: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
    setinputvalue({
      ...inputvalue,
      [name]: value,
    })
  }

  const formData = {
    email: inputvalue.email,
    password: inputvalue.password,
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    // loginUser(formData)
  }
  useEffect(() => {
    // Clear all the errors,when page is loaded
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
  }, [])
  return (
    <>
      {false ? <Loader /> : null}
      <div className="Login">
        <form noValidate onSubmit={handleFormSubmit}>
          {errorMsg.status ? (
            <div
              className={` error-div text-${errorMsg.color}`}
              style={{ textAlign: "center" }}
            >
              <h6>There was a problem</h6>
              <h6>{errorMsg.msg}</h6>
            </div>
          ) : null}

          <h3>Login</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={inputvalue.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inputvalue.password}
              onChange={handleChange}
            />
          </div>
          <div className="row-div">
            <div className="check-box-group ">
              <input type="checkbox" />
              <h6 className="">Remember me</h6>
            </div>
            <h6 className="forgot-password">Forgot password</h6>
          </div>

          <button variant="primary" type="submit">
            Login
          </button>
          <p className="text-muted">
            By continuing, you agree to the Terms and Conditions of Use and
            Privacy Notice.
          </p>
          <hr />
          <div className="part-2">
            <p>New user!</p>
            <p>Create you account</p>
          </div>
        </form>
      </div>
    </>
  )
}

Login.propTypes = {}

export default Login
