import React from "react"
// import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
const Home = (props) => {
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  return (
    <>
      {user && !user.confirmed && (
        <div
          style={{ textAlign: "center" }}
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Confirmation mail send to{" "}
          <a href={"mailto:" + user.email}>{user.email}</a>. Please confirm your
          account to get started.
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  )
}

// Home.propTypes = {}

export default Home
