const defaultState = {
  CONTENT_VIEWER_DATA: {},
  FILE_LOADER_DATA: {},
  INPUT_FIELD_DATA: {},
  NOTIFICATIONS_DATA: {}
};

const SET_CONTENT_VIEWER_DATA = 'SET_CONTENT_VIEWER_DATA';
const SET_FILE_LOADER_DATA = 'SET_FILE_LOADER_DATA';
const SET_INPUT_FIELD_DATA = 'SET_INPUT_FIELD_DATA';
const SET_NOTIFICATIONS_DATA = 'SET_NOTIFICATIONS_DATA';

const SET_FILE_LOADER_DATA_FILES = 'SET_FILE_LOADER_DATA_FILES';

export function modalWindowsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CONTENT_VIEWER_DATA:
      return { ...state, CONTENT_VIEWER_DATA: action.payload };
    case SET_FILE_LOADER_DATA:
      return { ...state, FILE_LOADER_DATA: action.payload };
    case SET_INPUT_FIELD_DATA:
      return { ...state, INPUT_FIELD_DATA: action.payload };
    case SET_NOTIFICATIONS_DATA:
      return { ...state, NOTIFICATIONS_DATA: action.payload };

    case SET_FILE_LOADER_DATA_FILES:
      return {
        ...state,
        FILE_LOADER_DATA: {
          ...state.FILE_LOADER_DATA,
          files: action.payload
        }
      }

    default:
      return state;
  };
};