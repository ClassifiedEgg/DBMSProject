import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import { USER_LOADED, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_USER, AUTH_ERROR } from './types'

// Loads user into the store
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
    console.error(err.message)
  }
}

// Register User (Send data to backend to make user and also login the user directly)
export const registerUser = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({ type: REGISTER_SUCCESS, payload: res.data })

    dispatch(loadUser())
  } catch (err) {
    // dispatch(authError())
    console.error(err.message)
  }
}

// Login user and load their data into the store
export const loginUser = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.post('/api/auth', body, config)

    dispatch({ type: LOGIN_SUCCESS, payload: res.data })

    dispatch(loadUser())
  } catch (err) {
    // dispatch(authError())
    console.error(err.message)
  }
}

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER })
}