import axios from 'axios'
import history from '../history'

import { GET_WORKOUT, GET_WORKOUTS, NEW_WORKOUT, EDIT_WORKOUT, DELETE_WORKOUT } from './types'

// Get all workouts for user
export const getAllWorkouts = () => async dispatch => {
  try {
    const res = await axios.get(`/api/workouts/`)

    dispatch({
      type: GET_WORKOUTS,
      payload: res.data
    })
  } catch (err) {
    // dispatch(workoutError())
    console.error(err.message)
  }
}

// Get one workout from user
export const getWorkout = (wkId) => async dispatch => {
  try {
    const res = await axios.get(`/api/workouts/${wkId}`)

    dispatch({
      type: GET_WORKOUT,
      payload: res.data
    })
  } catch (err) {
    // dispatch(workoutError())
    console.error(err.message)
  }
}

// Make a new workout
export const makeNewWorkout = (formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify(formData)

  try {
    const res = await axios.post(`/api/workouts`, body, config)

    dispatch({
      type: NEW_WORKOUT,
      payload: res.data
    })

    history.push('/dashboard')
  } catch (err) {
    // dispatch(workoutError())
    console.error(err.message)
  }
}

// Edit a workout
export const editWorkout = (workouts, wkId) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify(workouts)

  try {
    const res = await axios.put(`/api/workouts/${wkId}`, body, config)

    dispatch({
      type: EDIT_WORKOUT,
      payload: {
        wkId,
        workout: res.data
      }
    })
    history.push('/dashboard')
  } catch (err) {
    // dispatch(wrokoutError())
    console.error(err.message)
  }
}

// Delete a Workout
export const deleteWorkout = (wkId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/workouts/${wkId}`)

    dispatch({
      type: DELETE_WORKOUT,
      payload: wkId
    })
  } catch (err) {
    // dispatch(workoutError())
    console.error(err.message)
  }
} 