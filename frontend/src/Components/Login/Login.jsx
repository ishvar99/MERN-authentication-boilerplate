import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"
import { LoginUser ,GSignIn} from "../../redux/actions/authActions"
import { ClearError } from "../../redux/actions/authActions"
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn"
import {GoogleLogin} from 'react-google-login'
const Login = (props) => {
  const auth = useSelector((state) => state.auth)
  const { error, isAuthenticated } = auth
  const dispatch = useDispatch()
  const [inputvalue, setinputvalue] = useState({
    email: "",
    password: "",
  })
  const [errorMsg, seterrorMsg] = useState({
    status: false,
    color: "",
    msg: "",
  })

  const googleSuccess=async (res)=>{
    console.log(res); 
    const tokenId =res?.tokenId;
    dispatch(GSignIn({tokenId}))
  }
  const googleFailure=()=>{
    seterrorMsg({
      status: true,
    color: "danger",
    msg: "Something went wrong!",
    })
  }
  const handleChange = (event) => {
    const { name, value } = event.target

    setinputvalue({
      ...inputvalue,
      [name]: value,
    })
  }

  const formData = {
    email: inputvalue.email,
    password: inputvalue.password,
  }
  const checkErrors = () => {
    if (inputvalue.email && inputvalue.password) {
      return false
    }
    seterrorMsg({
      status: true,
      msg: "Please fill in all the details",
      color: "danger",
    })
    return true
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!checkErrors()) {
      dispatch(ClearError())
      dispatch(LoginUser(formData))
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }
    if (error) {
      seterrorMsg({
        status: true,
        msg: error,
        color: "danger",
      })
    }
  }, [isAuthenticated, error, props.history])
  useEffect(() => {
    // Clear all the errors, when page is loaded
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
  }, [])
  return (
    <>
      <div className="Form">
        <form noValidate onSubmit={handleFormSubmit}>
          {errorMsg.status ? (
            <div
              className={` error-div text-${errorMsg.color}`}
              style={{ textAlign: "center" }}
            >
              <h6>{errorMsg.msg}</h6>
              <span
                onClick={() =>
                  seterrorMsg({ status: false, color: "", msg: "" })
                }
              >
                x
              </span>
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
            <Link
              to="/password_reset"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "14px",
              }}
            >
              <h6 className="forgot-password">Forgot password</h6>
            </Link>
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
            <Link
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
              to="/register"
            >
              <p>Create an account!</p>
              <div style={{fontWeight:'500'}}>Or</div>
          <GoogleLogin 
    clientId="17398736997-lr6su6hfveu96ir3vgviuqanmb51a9t7.apps.googleusercontent.com"
    render={props=>(
      <GoogleSignIn clicked={props.onClick}/>
    )}
    onSuccess={googleSuccess}
    onFailure={googleFailure}
    cookiePolicy={'single_host_origin'}
  />
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
