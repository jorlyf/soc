const defaultState = {
  IS_LOADED: false,
  CURRENT_OPENED_PROFILE_DATA: {}
};

const SET_IS_LOADED = 'SET_IS_LOADED';
const SET_CURRENT_OPENED_PROFILE_DATA = 'SET_CURRENT_OPENED_PROFILE_DATA';
const SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL = 'SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL';

export function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_IS_LOADED:
      return { ...state, IS_LOADED: action.payload };
    case SET_CURRENT_OPENED_PROFILE_DATA:
      return { ...state, CURRENT_OPENED_PROFILE_DATA: action.payload };
    case SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL:
      return {
        ...state,
        CURRENT_OPENED_PROFILE_DATA: {
          ...state.CURRENT_OPENED_PROFILE_DATA,
          avatarUrl: action.payload
        }
      };

    default:
      return state;
  };
};