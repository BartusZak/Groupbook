import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //to 3ba przerzucic do ./theme/globalStyle
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader'; //to jest do czcionek na stronie

//redux-thunk
import  { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import  { Provider} from 'react-redux';
import thunk from 'redux-thunk';

//import reducerow
import logginReducer from './store/reducers/logginAction';
import CommentsReducer from './store/Comments/Reducers';
import GroupReducer from './store/Groups/Reducers';
import PostsReducer from './store/Posts/Reducers';
import EventsReducer from './store/Events/Reducers';
import userOptionsReducer from './containers/UserOptions/Store/reducer';
import changePassword from 'store/reducers/changePassword';
import deleteAccount from 'store/reducers/deleteAccount';


import './theme/globalStyle'; //globalne style css 
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


WebFont.load({
    google: {
      families: ['Nunito:300,400,700', 'sans-serif']
    }
  });

const rootReducer = combineReducers({
    logRed: logginReducer,
    userOptionsRed: userOptionsReducer,
    CommentsReducer: CommentsReducer,
    GroupReducer: GroupReducer,
    PostsReducer: PostsReducer,
    EventsReducer: EventsReducer,
    changePassword: changePassword,
    deleteAccount: deleteAccount
}); 

//redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();


