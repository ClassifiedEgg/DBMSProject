import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import { USER_LOADED, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_USER, AUTH_ERROR, NO_TOKEN } from './types'

// Loads user into the store
export const loadUser = () => async dispatch => {
  if (localStorage.token && localStorage.token !== "null" && localStorage.token !== "undefined") {
    setAuthToken(localStorage.token)
  } else {
    dispatch({ type: NO_TOKEN })
    return
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    {
      getUser {
        firstName
        lastName
        weight
        height
        age
        email
        workouts {
          _id
        }
        diets {
          _id
        }
      }
    }
    `
  }

  const body = JSON.stringify(graphqlQuery)

  try {
    const res = await axios.post('/graphql', body, config)

    dispatch({
      type: USER_LOADED,
      payload: res.data.data.getUser
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.errors[0].message
    })
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

  let graphqlQuery = {
    query: `
      mutation RegisterAUser($formData: UserRegisterInput!) {
        registerUser(userInput: $formData) {
          token
        }
      }
    `
  }

  const body = JSON.stringify({ query: graphqlQuery.query, variables: { formData } })

  try {
    const res = await axios.post('/graphql', body, config)

    dispatch({ type: REGISTER_SUCCESS, payload: res.data.data.registerUser.token })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Login user and load their data into the store
export const loginUser = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }


  let graphqlQuery = {
    query: `
    {
      loginUser(userInput: {username: "${username}", password: "${password}"}) {
        token
      }
    }
    `
  }

  const body = JSON.stringify(graphqlQuery)

  try {
    const res = await axios.post('/graphql', body, config)

    dispatch({ type: LOGIN_SUCCESS, payload: res.data.data.loginUser.token })

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER })
}