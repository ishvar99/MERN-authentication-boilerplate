import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SET_LOADING,
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/types"
const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR: {
      return {
        ...state,
        error: action.payload || "Server Error",
        loading: false,
        user: null,
      }
    }
    case USER_LOADED: {
      return {
        ...state,
        user: action.payload.data,
        loading: false,
        isAuthenticated: true,
        error: null,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    }
    default:
      return state
  }
}
