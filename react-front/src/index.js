import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { rootReducer } from './reduxReducers/rootReducer.js';

import App from './App';
import ModalWindows from './ModalWindows';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ModalWindows />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);

