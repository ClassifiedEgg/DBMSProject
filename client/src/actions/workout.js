import axios from 'axios'
import history from '../history'

import { GET_WORKOUT, GET_WORKOUTS, NEW_WORKOUT, EDIT_WORKOUT, DELETE_WORKOUT, WORKOUT_ERROR, SUCCESS_MSG } from './types'

// Get all workouts for user
export const getAllWorkouts = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    {
      getWorkouts {
        _id
        workout {
          _id
          workoutName
          allExercises {
            name
            reps
          }
          date
        }
      }
    }
    `
  }

  const body = JSON.stringify(graphqlQuery)

  try {
    const res = await axios.post(`/graphql`, body, config)
    dispatch({
      type: GET_WORKOUTS,
      payload: res.data.data.getWorkouts.map(({ workout }) => workout)
    })
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Get one workout from user
export const getWorkout = (wkId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    {
      getWorkout(wkId: "${wkId}") {
        _id
        workoutName
        allExercises {
          name
          reps
        }
        date
      }
    }
    `
  }

  const body = JSON.stringify(graphqlQuery)

  try {
    const res = await axios.post(`/graphql`, body, config)

    dispatch({
      type: GET_WORKOUT,
      payload: res.data.data.getWorkout
    })
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Make a new workout
export const makeNewWorkout = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  formData.allExercises = formData.allExercises.map(({ name, reps }) => ({ name, reps: parseFloat(reps) }))

  let graphqlQuery = {
    query: `
    mutation CreateANewWorkout($formData: NewWorkoutInput!) {
      makeNewWorkout(userInput: $formData) {
        _id
        workoutName
        allExercises {
          name
          reps
        }
        date
      }
    }
    `
  }

  const body = JSON.stringify({ query: graphqlQuery.query, variables: { formData } })

  try {
    const res = await axios.post(`/graphql`, body, config)

    dispatch({
      type: NEW_WORKOUT,
      payload: res.data.data.makeNewWorkout
    })

    history.push('/dashboard')

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Created Workout successfully'
    })

  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Edit a workout
export const editWorkout = (formData, wkId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  formData.allExercises = formData.allExercises.map(({ name, reps }) => ({ name, reps: parseFloat(reps) }))

  let graphqlQuery = {
    query: `
    mutation EditExistingWorkout($wkId: ID!, $formData: NewWorkoutInput!) {
      editWorkout(wkId: $wkId, userInput: $formData) {
        _id
        workoutName
        allExercises {
          name
          reps
        }
        date
      }
    }
    `
  }

  const body = JSON.stringify({ query: graphqlQuery.query, variables: { formData, wkId } })

  try {
    const res = await axios.post(`/graphql`, body, config)

    dispatch({
      type: EDIT_WORKOUT,
      payload: {
        wkId,
        workout: res.data.data.editWorkout
      }
    })

    history.push('/dashboard')

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Edited Workout successfully'
    })
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Delete a Workout
export const deleteWorkout = (wkId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    mutation {
      deleteWorkout(wkId: "${wkId}")
    }
    `
  }

  const body = JSON.stringify(graphqlQuery)
  
  try {
    await axios.post(`/graphql`, body, config)

    dispatch({
      type: DELETE_WORKOUT,
      payload: wkId
    })

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Deleted Workout successfully'
    })
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
} 