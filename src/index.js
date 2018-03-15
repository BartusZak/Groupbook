import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import  { createStore, combineReducers, applyMiddleware } from 'redux';
import logginReducer from './store/reducers/logginAction';
import asyncReducer from './store/reducers/asyncReducer';
import userOptionsReducer from './containers/UserOptions/Store/reducer';
import  { Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import thunk from 'redux-thunk';
import './theme/globalStyle';


WebFont.load({
    google: {
      families: ['Nunito:300,400,700', 'sans-serif']
    }
  });

const rootReducer = combineReducers({
    asyncRed: asyncReducer,
    logRed: logginReducer,
    userOptionsRed: userOptionsReducer
}); 

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();


