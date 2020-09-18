import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import validator from "validator"
import "./ResetPassword.scss"
// import { ResetPasswordAction } from "../../redux/actions/authActions"
const ResetPassword = (props) => {
  const auth = useSelector((state) => state.auth)
  const { message, isAuthenticated } = auth
  const dispatch = useDispatch()
  const [inputvalue, setinputvalue] = useState({
    password: "",
    password2: "",
  })
  const [Msg, setMsg] = useState({
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
    password: inputvalue.password,
    password2: inputvalue.password2,
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!inputvalue.password && !inputvalue.password2) {
      setMsg({
        status: true,
        msg: "Please fill in all the details",
        color: "danger",
      })
    } else {
      // dispatch(ForgotPasswordAction(formData))
      setTimeout(() => {
        setMsg({
          status: false,
          color: "",
          msg: "",
        })
      }, 3000)
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }
    if (message) {
      console.log(message)
      if (message.data) {
        setMsg({
          status: true,
          msg: message.data,
          color: "success",
        })
      } else if (message.error) {
        setMsg({
          status: true,
          msg: message.error,
          color: "danger",
        })
      }
    }
  }, [isAuthenticated, message, props.history])
  useEffect(() => {
    // Clear all the errors, when page is loaded
    setMsg({
      status: false,
      color: "",
      msg: "",
    })
  }, [])
  return (
    <>
      <div className="Login">
        <form noValidate onSubmit={handleFormSubmit}>
          {Msg.status ? (
            <div
              className={`${
                Msg.color === "success" ? "success-div" : "error-div"
              } text-${Msg.color}`}
              style={{ textAlign: "center" }}
            >
              <h6>{Msg.msg}</h6>
            </div>
          ) : null}

          <h3>Reset Password</h3>

          <div className="form-group">
            <label>New password</label>
            <input
              type="password"
              name="password"
              value={inputvalue.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Retype new password</label>
            <input
              type="password2"
              name="password2"
              value={inputvalue.password2}
              onChange={handleChange}
            />
          </div>
          <button variant="primary" type="submit">
            Reset password
          </button>
        </form>
      </div>
    </>
  )
}

export default ResetPassword
