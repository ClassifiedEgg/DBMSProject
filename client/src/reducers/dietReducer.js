import { GET_DIET, GET_DIETS, NEW_DIET, EDIT_DIET, DELETE_DIET } from '../actions/types'

const initialState = {
  allDiets: [],
  diet: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DIETS:
      return {
        ...state,
        allDiets: [...payload],
        loading: false,
      };
    case GET_DIET:
      return {
        ...state,
        diet: payload,
        loading: false
      };
    case NEW_DIET:
    case EDIT_DIET:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DIET:
      return {
        ...state,
        allDiets: state.allDiets.filter(({ diet: { _id } }) => _id !== payload)
      }
    default:
      return state;
  }
}