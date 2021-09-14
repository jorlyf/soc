const defaultState = {
  IS_LOADED: false,
  CURRENT_OPENED_PROFILE_DATA: {},
  CREATE_POST_DATA: { files: [], text: "" }
};

const SET_IS_LOADED = "SET_IS_LOADED";
const SET_CURRENT_OPENED_PROFILE_DATA = "SET_CURRENT_OPENED_PROFILE_DATA";
const SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL = "SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL";
const SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP = "SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP";
const SET_CURRENT_OPENED_PROFILE_DATA_STATUS = "SET_CURRENT_OPENED_PROFILE_DATA_STATUS";

const SET_CREATE_POST_DATA = "SET_CREATE_POST_DATA";
const CLEAR_CREATE_POST_DATA = "CLEAR_CREATE_POST_DATA";
const SET_CREATE_POST_FILES = "SET_CREATE_POST_FILES";
const SET_CREATE_POST_TEXT = "SET_CREATE_POST_TEXT";

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
    case SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP:
      return {
        ...state,
        CURRENT_OPENED_PROFILE_DATA: {
          ...state.CURRENT_OPENED_PROFILE_DATA,
          ourFriendship: action.payload
        }
      };
    case SET_CURRENT_OPENED_PROFILE_DATA_STATUS:
      return {
        ...state,
        CURRENT_OPENED_PROFILE_DATA: {
          ...state.CURRENT_OPENED_PROFILE_DATA,
          status: action.payload
        }
      };
    case SET_CREATE_POST_DATA:
      return {
        ...state,
        CREATE_POST_DATA: action.payload
      };
    case CLEAR_CREATE_POST_DATA:
      return {
        ...state,
        CREATE_POST_DATA: { text: "", files: [] }
      }
    case SET_CREATE_POST_FILES:
      return {
        ...state,
        CREATE_POST_DATA: {
          ...state.CREATE_POST_DATA,
          files: action.payload
        }
      };
    case SET_CREATE_POST_TEXT:
      return {
        ...state,
        CREATE_POST_DATA: {
          ...state.CREATE_POST_DATA,
          text: action.payload
        }
      };

    default:
      return state;
  };
};