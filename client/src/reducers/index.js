import { combineReducers } from 'redux'
import authReducer from './authReducer'
import workoutReducer from './workoutReducer'
import dietReducer from './dietReducer'
import alertReducer from './alertReducer'

export default combineReducers({
  auth: authReducer,
  workouts: workoutReducer,
  diets: dietReducer,
  alerts: alertReducer,
})