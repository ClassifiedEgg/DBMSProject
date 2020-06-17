import { v4 as uuidv4 } from 'uuid'

import { AUTH_ERROR, WORKOUT_ERROR, DIET_ERROR, SUCCESS_MSG } from '../actions/types'

const inisitalState = {
  color: "",
  message: ""
}

export default function (state = inisitalState, action) {
  const { type, payload } = action

  switch (type) {
    case AUTH_ERROR:
    case WORKOUT_ERROR:
    case DIET_ERROR:
      return {
        ...state,
        color: 'red',
        message: payload,
        alertId: uuidv4()
      }
    case SUCCESS_MSG:
      return {
        ...state,
        color: 'green',
        message: payload,
        alertId: uuidv4()
      }
    default:
      return state
  }
}