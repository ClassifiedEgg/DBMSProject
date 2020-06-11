import { combineReducers } from 'redux'
import authReducer from './authReducer'
import workoutReducer from './workoutReducer'
import dietReducer from './dietReducer'

export default combineReducers({
  auth: authReducer,
  workouts: workoutReducer,
  diets: dietReducer,
})