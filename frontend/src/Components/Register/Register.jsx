import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import validator from "validator"
import { useSelector, useDispatch } from "react-redux"
import { RegisterUser } from "../../redux/actions/authActions"
import "./Register.scss"
import Loader from "../../Components/Loader/Loader"
const Register = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { loading, error, isAuthenticated } = auth
  let history = useHistory()
  const [inputvalue, setinputvalue] = useState({
    uname: "",
    age: "",
    email: "",
    password: "",
  })
  const [errorMsg, seterrorMsg] = useState({
    status: false,
    color: "",
    msg: "",
  })
  useEffect(() => {
    if (isAuthenticated && !loading) {
      history.push("/")
    }
    if (error) {
      seterrorMsg({
        status: "true",
        msg: error,
        color: "danger",
      })
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history])
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
    name: inputvalue.uname,
    age: inputvalue.age,
    email: inputvalue.email,
    password: inputvalue.password,
  }
  const checkErrors = () => {
    if (
      inputvalue.uname &&
      inputvalue.age &&
      inputvalue.email &&
      inputvalue.password
    ) {
      if (validator.isEmail(inputvalue.email)) {
        if (inputvalue.password.length < 5) {
          seterrorMsg({
            status: true,
            msg: "Password should be atleast 6 characters",
            color: "danger",
          })
        } else {
          return false
        }
      } else {
        seterrorMsg({
          status: true,
          msg: "Please provide a valid email",
          color: "danger",
        })
      }
    } else {
      seterrorMsg({
        status: true,
        msg: "Please fill in all the details",
        color: "danger",
      })
    }
    return true
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
    if (!checkErrors()) {
      dispatch(RegisterUser(formData))
    }
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
      <div className="Register">
        <form noValidate onSubmit={handleFormSubmit}>
          {errorMsg.status ? (
            <div
              className={`error-div text-${errorMsg.color}`}
              style={{ textAlign: "center" }}
            >
              <h6> There was a problem</h6>
              <h6>{errorMsg.msg}</h6>
            </div>
          ) : null}
          <h3>Register</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="uname"
              value={inputvalue.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={inputvalue.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
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

          <button
            variant="primary"
            type="submit"
            style={{ opacity: loading ? "0.7" : "1" }}
          >
            {loading ? <Loader /> : "Register"}
          </button>
          <p className="text-muted">
            By continuing, you agree to the Terms and Conditions of Use and
            Privacy Notice.
          </p>
          <hr />
          <div className="part-2">
            <p>Existing user!</p>
            <p>Login to continue</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
