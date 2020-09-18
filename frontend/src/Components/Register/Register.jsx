import React, { useEffect, useState } from "react"
import validator from "validator"
import { useSelector, useDispatch } from "react-redux"
import { RegisterUser } from "../../redux/actions/authActions"
import { Link } from "react-router-dom"

const Register = (props) => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { error, isAuthenticated } = auth
  const [inputvalue, setinputvalue] = useState({
    uname: "",
    email: "",
    password: "",
    password2: "",
  })
  const [errorMsg, seterrorMsg] = useState({
    status: false,
    color: "",
    msg: "",
  })
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }
    if (error) {
      seterrorMsg({
        status: "true",
        msg: error,
        color: "danger",
      })
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])
  const handleChange = (event) => {
    const { name, value } = event.target

    setinputvalue({
      ...inputvalue,
      [name]: value,
    })
  }

  const formData = {
    name: inputvalue.uname,
    email: inputvalue.email,
    password: inputvalue.password,
    password2: inputvalue.password2,
  }
  const checkErrors = () => {
    console.log(inputvalue.password, inputvalue.password2)
    if (
      inputvalue.uname &&
      inputvalue.password2 &&
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
        } else if (inputvalue.password !== inputvalue.password2) {
          seterrorMsg({
            status: true,
            msg: "Passwords don't match!",
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
      <div className="Form">
        <form noValidate onSubmit={handleFormSubmit}>
          {errorMsg.status ? (
            <div
              className={`error-div text-${errorMsg.color}`}
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
          <div className="form-group">
            <label>Re-type Password</label>
            <input
              type="password"
              name="password2"
              value={inputvalue.password2}
              onChange={handleChange}
            />
          </div>
          <button variant="primary" type="submit">
            Register
          </button>
          <p className="text-muted">
            By continuing, you agree to the Terms and Conditions of Use and
            Privacy Notice.
          </p>
          <hr />
          <div className="part-2">
            <p>Existing user!</p>
            <Link
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
              to="/login"
            >
              <p>Login to continue!</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
