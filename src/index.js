import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { combineReducers, createStore } from 'redux';
import reducer from './redux-store/reducers';
import { Provider } from 'react-redux';
const initialState = { count: 5 }
const AllReducers = combineReducers({ counter: reducer });
const mystore = createStore(AllReducers, initialState);
ReactDOM.render( //main method
  <React.StrictMode>
    <Provider store={mystore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
  () => console.log('app initialized')
);