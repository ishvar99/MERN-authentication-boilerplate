import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SET_LOADING,
  LOGIN_FAIL,
  REGISTER_FAIL,
} from "./types"
import axios from "axios"
axios.defaults.headers.post["Content-Type"] = "application/json"

export const LoginUser = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(SetLoading())
      const response = await axios.post(
        "/api/v1/auth/login",
        JSON.stringify(formData)
      )
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      })
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
      const response = await axios.post(
        "/api/v1/auth/register",
        JSON.stringify(formData)
      )
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error,
      })
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
