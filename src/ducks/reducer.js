const initialState = {
  username: '', //user
  id: '',
  profilePicture: ''
}

const GET_USER = 'GET_USER'
const CLEAR_USER = 'CLEAR_USER'
const SET_USER = 'SET_USER'

export function getUser() {
  return {
    type: GET_USER,
    payload: null
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: {}
  }
}

export function setUser(userObj) {
  return {
    type: GET_USER,
    payload: userObj
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...state, username: payload.username, id: payload.id }; //user
    case GET_USER:
      return { ...state}; //user
    case CLEAR_USER:
      return { ...state, username: "", id: "" }; //user
    default:
      return state;
  }
}