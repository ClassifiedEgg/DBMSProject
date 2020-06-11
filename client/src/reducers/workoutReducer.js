import { GET_WORKOUT, GET_WORKOUTS, NEW_WORKOUT, EDIT_WORKOUT, DELETE_WORKOUT } from '../actions/types'

const initialState = {
  allWorkouts: [],
  workout: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKOUTS:
      return {
        ...state,
        allWorkouts: [...payload],
        loading: false,
      };
    case GET_WORKOUT:
      return {
        ...state,
        workout: payload,
        loading: false
      };
    case NEW_WORKOUT:
    case EDIT_WORKOUT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        allWorkouts: state.allWorkouts.filter(({ workout: { _id } }) => _id !== payload)
      }
    default:
      return state;
  }
}