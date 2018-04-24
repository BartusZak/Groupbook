import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //to 3ba przerzucic do ./theme/globalStyle
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader'; //to jest do czcionek na stronie
import  { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logginReducer from './store/reducers/logginAction';

import userOptionsReducer from './containers/UserOptions/Store/reducer';
import  { Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './theme/globalStyle'; //globalne style css 
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import CommentsReducer from './store/Comments/Reducers';
import GroupsReducer from './store/Groups/Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

WebFont.load({
    google: {
      families: ['Nunito:300,400,700', 'sans-serif']
    }
  });

const rootReducer = combineReducers({
    logRed: logginReducer,
    userOptionsRed: userOptionsReducer,
    CommentsReducer: CommentsReducer,
    groupsRed: GroupsReducer
}); 
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();


