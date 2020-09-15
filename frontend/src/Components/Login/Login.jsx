import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./Login.scss"
import { Link } from "react-router-dom"
import { LoginUser } from "../../redux/actions/authActions"
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

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!inputvalue.email && !inputvalue.password) {
      seterrorMsg({
        status: true,
        msg: "Please fill in all the details",
        color: "danger",
      })
    } else {
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
      // setTimeout(() => {
      //   seterrorMsg({
      //     status: false,
      //     color: "",
      //     msg: "",
      //   })
      // }, 5000)
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
      <div className="Login">
        <form noValidate onSubmit={handleFormSubmit}>
          {errorMsg.status ? (
            <div
              className={` error-div text-${errorMsg.color}`}
              style={{ textAlign: "center" }}
            >
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
            <Link
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
              to="/register"
            >
              <p>Create an account!</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
