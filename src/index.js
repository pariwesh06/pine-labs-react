import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reducer from './redux-store/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const initialState = {}

const AllReducers = combineReducers({ data: reducer });
const mystore = createStore(AllReducers, initialState, compose(applyMiddleware(thunk)));
ReactDOM.render( //main method
  <React.StrictMode>
    <Provider store={mystore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
  () => console.log('app initialized')
);