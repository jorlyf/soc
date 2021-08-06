const defaultState = {
    USER_ID: 0,
    ACCESS_TOKEN: '',
    AUTHORIZE_STATUS: false
};

const SET_USER_ID = 'SET_USER_ID';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const SET_AUTHORIZE_STATUS = 'SET_AUTHORIZE_STATUS';


export function authReducer (state = defaultState, action) {
    switch (action.type) {
        case SET_USER_ID:
            return {...state, USER_ID: action.payload};

        case SET_ACCESS_TOKEN:
            return {...state, ACCESS_TOKEN: action.payload};

        case SET_AUTHORIZE_STATUS:
            return {...state, AUTHORIZE_STATUS: action.payload};

        default:
            return state;
    };
};