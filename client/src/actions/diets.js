import axios from 'axios'
import history from '../history'

import { GET_DIETS, GET_DIET, NEW_DIET, EDIT_DIET, DELETE_DIET, DIET_ERROR, SUCCESS_MSG } from './types'

// Get all diets for user
export const getAllDiets = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    {
      getDiets {
        _id
        diet {
          _id
          dietName
          allMeals {
            name
            kcal
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
      type: GET_DIETS,
      payload: res.data.data.getDiets.map(({ diet }) => diet)
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Get one diet from user
export const getDiet = (dietId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    {
      getDiet(dietId: "${dietId}") {
        _id
        workoutName
        allMeals {
          name
          kcal
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
      type: GET_DIET,
      payload: res.data.data.getDiet
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Make a new diet
export const makeNewDiet = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  formData.allMeals = formData.allMeals.map(({ name, kcal }) => ({ name, kcal: parseFloat(kcal) }))

  let graphqlQuery = {
    query: `
    mutation CreateANewDiett($formData: NewDietInput!) {
      makeNewDiet(userInput: $formData) {
        _id
        dietName
        allMeals {
          name
          kcal
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
      type: NEW_DIET,
      payload: res.data.data.makeNewDiet
    })

    history.push('/dashboard')

    dispatch({
      type: SUCCESS_MSG,
      payload: 'Created Diet successfully'
    })
  } catch (err) {
    dispatch({
      type: DIET_ERROR,
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Edit a diet
export const editDiet = (formData, dietId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  formData.allMeals = formData.allMeals.map(({ name, kcal }) => ({ name, kcal: parseFloat(kcal) }))

  let graphqlQuery = {
    query: `
    mutation EditExistingDiet($wkId: ID!, $formData: NewDietInput!) {
      editDiet(dietId: $dietId, userInput: $formData) {
        _id
        dietName
        allMeals {
          name
          kcal
        }
        date
      }
    }
    `
  }

  const body = JSON.stringify({ query: graphqlQuery.query, variables: { formData, dietId } })

  try {
    const res = await axios.post(`/graphql`, body, config)

    dispatch({
      type: EDIT_DIET,
      payload: {
        dietId,
        diet: res.data.data.editDiet
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
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
}

// Delete a diet
export const deleteDiet = (dietId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let graphqlQuery = {
    query: `
    mutation {
      deleteDiet(dietId: "${dietId}")
    }
    `
  }

  const body = JSON.stringify(graphqlQuery)

  console.log(dietId)

  try {
    await axios.post(`/graphql`, body, config)

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
      payload: err.response.data.errors[0].message
    })
    console.error(err.message)
  }
} 