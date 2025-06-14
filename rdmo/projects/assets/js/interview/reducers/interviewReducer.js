import {
  FETCH_PAGE_INIT,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_ERROR,
  FETCH_NAVIGATION_INIT,
  FETCH_NAVIGATION_SUCCESS,
  FETCH_NAVIGATION_ERROR,
  FETCH_OPTIONS_INIT,
  FETCH_OPTIONS_SUCCESS,
  FETCH_OPTIONS_ERROR,
  FETCH_VALUES_INIT,
  FETCH_VALUES_SUCCESS,
  FETCH_VALUES_ERROR,
  RESOLVE_CONDITION_INIT,
  RESOLVE_CONDITION_SUCCESS,
  RESOLVE_CONDITION_ERROR,
  CREATE_VALUE,
  UPDATE_VALUE,
  STORE_VALUE_INIT,
  STORE_VALUE_SUCCESS,
  STORE_VALUE_ERROR,
  DELETE_VALUE_INIT,
  DELETE_VALUE_SUCCESS,
  DELETE_VALUE_ERROR,
  CREATE_SET,
  DELETE_SET_INIT,
  DELETE_SET_SUCCESS,
  DELETE_SET_ERROR,
  COPY_SET_INIT,
  COPY_SET_SUCCESS,
  COPY_SET_ERROR
} from '../actions/actionTypes'

const initialState = {
  done: null,
  page: null,
  navigation: null,
  values: null,
  attributes: [],
  sets: [],
  errors: []
}

export default function interviewReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PAGE_SUCCESS:
      return { ...state, page: action.page, done: action.done }
    case FETCH_NAVIGATION_SUCCESS:
      return { ...state, navigation: action.navigation }
    case FETCH_VALUES_SUCCESS:
      return { ...state, values: action.values, sets: action.sets }
    case FETCH_OPTIONS_SUCCESS:
      return { ...state, page: action.page }
    case RESOLVE_CONDITION_SUCCESS:
      return { ...state, sets: state.sets.map(
        (set) => (
          (set.set_prefix == action.set.set_prefix) &&
          (set.set_index == action.set.set_index)
        ) ? {
          ...set, [action.elementType]: {...set[action.elementType], [action.elementId]: action.result}
        } : set
      )}
    case CREATE_VALUE:
      return { ...state, values: [...state.values, action.value] }
    case UPDATE_VALUE:
      return { ...state, values: state.values.map(
        (value) => value.id == action.value.id ? {...value, ...action.attrs} : value
      )}
    case STORE_VALUE_SUCCESS:
      if (action.valueIndex > -1) {
        return { ...state, values: state.values.map(
          (value, valueIndex) => valueIndex == action.valueIndex ? action.value : value
        )}
      } else {
        return { ...state, values: [...state.values, action.value] }
      }
    case DELETE_VALUE_SUCCESS:
      return {...state, values: state.values.filter((value) => value.id !== action.value.id)}
    case CREATE_SET:
      return { ...state, values: action.values, sets: action.sets }
    case DELETE_SET_SUCCESS:
      return {
        ...state,
        values: state.values.filter((value) => !action.values.includes(value)),
        sets: state.sets.filter((set) => !action.sets.includes(set))
      }
    case COPY_SET_SUCCESS:
      return { ...state, values: action.values, sets: action.sets }
    case FETCH_PAGE_INIT:
    case FETCH_NAVIGATION_INIT:
    case FETCH_OPTIONS_INIT:
    case FETCH_VALUES_INIT:
    case RESOLVE_CONDITION_INIT:
      return { ...state, errors: [] }
    case STORE_VALUE_INIT:
       return {
        ...state,
        values: state.values.map((value, valueIndex) => (
          valueIndex == action.valueIndex ? {...value, error: null, pending: true} : value
        ))
      }
    case DELETE_VALUE_INIT:
       return {
        ...state,
        values: state.values.map((value) => (
          value.id == action.value.id ? {...value, pending: true} : value
        ))
      }
    case DELETE_SET_INIT:
    case COPY_SET_INIT:
      return { ...state, errors: [] }
    case FETCH_PAGE_ERROR:
    case FETCH_NAVIGATION_ERROR:
    case FETCH_OPTIONS_ERROR:
    case FETCH_VALUES_ERROR:
    case RESOLVE_CONDITION_ERROR:
      return { ...state, errors: [...state.errors, { actionType: action.type, ...action.error }] }
    case STORE_VALUE_ERROR:
      if (action.valueIndex > -1) {
         return {
          ...state, values: state.values.map((value, valueIndex) => (
            valueIndex == action.valueIndex ? {...value, error: action.error, pending: false} : value
          ))
        }
      } else {
        return { ...state, errors: [...state.errors, { actionType: action.type, ...action.error }] }
      }
    case DELETE_VALUE_ERROR:
    case DELETE_SET_ERROR:
      return { ...state, errors: [...state.errors, { actionType: action.type, ...action.error }] }
    case COPY_SET_ERROR:
      return { ...state, errors: [...state.errors, { actionType: action.type, ...action.error }] }
    default:
      return state
  }
}
