const defaultState = {
  CONTENT_VIEWER_DATA: {},
  FILE_LOADER_DATA: {},
  NOTIFICATIONS_DATA: []
};

const SET_CONTENT_VIEWER_DATA = 'SET_CONTENT_VIEWER_DATA';
const SET_FILE_LOADER_DATA = 'SET_FILE_LOADER_DATA';
const SET_NOTIFICATIONS_DATA = 'SET_NOTIFICATIONS_DATA';

const SET_FILE_LOADER_DATA_FILES = 'SET_FILE_LOADER_DATA_FILES';
const SET_NEW_NOTIFICATION_DATA = 'SET_NEW_NOTIFICATION_DATA';

export function modalWindowsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CONTENT_VIEWER_DATA:
      return { ...state, CONTENT_VIEWER_DATA: { ...action.payload } };
    case SET_FILE_LOADER_DATA:
      return { ...state, FILE_LOADER_DATA: { ...action.payload, files: [] } };
    case SET_NOTIFICATIONS_DATA:
      return { ...state, NOTIFICATIONS_DATA: [...action.payload] };
    case SET_NEW_NOTIFICATION_DATA:
      return { ...state, NOTIFICATIONS_DATA: [...state.NOTIFICATIONS_DATA, action.payload] };

    case SET_FILE_LOADER_DATA_FILES:
      return {
        ...state,
        FILE_LOADER_DATA: {
          ...state.FILE_LOADER_DATA,
          files: [...action.payload]
        }
      };

    default:
      return state;
  };
};