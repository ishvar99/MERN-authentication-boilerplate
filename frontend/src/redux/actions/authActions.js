import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SET_LOADING,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "./types"
import axios from "axios"
axios.defaults.headers.post["Content-Type"] = "application/json"
const REGISTER_URL = "/api/v1/auth/register"
const LOGIN_URL = "/api/v1/auth/login"
const GET_CURRENT_USER = "/api/v1/auth/me"
export const LoadUser = () => {
  return async (dispatch) => {
    try {
      dispatch(SetLoading())
      const response = await axios.get(GET_CURRENT_USER)
      console.log("helo")
      dispatch({ type: USER_LOADED, payload: response.data })
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.err })
    }
  }
}
export const LoginUser = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(SetLoading())
      const response = await axios.post(LOGIN_URL, JSON.stringify(formData))
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      })
      dispatch(LoadUser())
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      })
    }
  }
}
export const RegisterUser = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(SetLoading())
      const response = await axios.post(REGISTER_URL, JSON.stringify(formData))
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      })
      dispatch(LoadUser())
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error,
      })
    }
  }
}
export const LogoutUser = () => {
  return async (dispatch) => {
    try {
      await axios.get("/api/v1/auth/logout")
      dispatch({ type: LOGOUT })
    } catch (error) {
      console.log(error)
    }
  }
}
export const SetLoading = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    })
  }
}
