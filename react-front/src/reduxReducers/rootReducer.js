import { combineReducers } from "redux";

import { appReducer } from './appReducer';
import { authReducer } from "./authReducer";
import { modalWindowsReducer } from "./modalWindowsReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    modalWindows: modalWindowsReducer
});
