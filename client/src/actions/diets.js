import axios from 'axios'
import history from '../history'

import { GET_DIETS, GET_DIET, NEW_DIET, EDIT_DIET, DELETE_DIET, DIET_ERROR, SUCCESS_MSG } from './types'

// Get all diets for user
export const getAllDiets = () => async dispatch => {
  try {
    const res = await axios.get(`/api/diets`)

    dispatch({
      type: GET_DIETS,
      payload: res.data.map(({ diet }) => diet)
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].msg
    })
    console.error(err.message)
  }
}

// Get one diet from user
export const getDiet = (dietId) => async dispatch => {
  try {
    const res = await axios.get(`/api/diets/${dietId}`)

    dispatch({
      type: GET_DIET,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].msg
    })
    console.error(err.message)
  }
}

// Make a new diet
export const makeNewDiet = (formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.post(`/api/diets`, body, config)

    dispatch({
      type: NEW_DIET,
      payload: res.data
    })

    history.push('/dashboard')

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Created Diet successfully'
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].msg
    })
    console.error(err.message)
  }
}

// Edit a diet
export const editDiet = (formData, dietId) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.put(`/api/diets/${dietId}`, body, config)

    dispatch({
      type: EDIT_DIET,
      payload: {
        dietId,
        diet: res.data
      }
    })

    history.push('/dashboard')

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Edited Diet successfully'
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].msg
    })
    console.error(err.message)
  }
}

// Delete a diet
export const deleteDiet = (dietId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/diets/${dietId}`)

    dispatch({
      type: DELETE_DIET,
      payload: dietId
    })

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Deleted Diet successfully'
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].msg
    })
    console.error(err.message)
  }
} 