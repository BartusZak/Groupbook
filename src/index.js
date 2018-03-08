import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import  { createStore } from 'redux';
import reducer from './store/reducer';
import  { Provider } from 'react-redux';


WebFont.load({
    google: {
      families: ['Nunito:300,400,700', 'sans-serif']
    }
  });

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
