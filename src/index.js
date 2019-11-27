//Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducers from './reducers/reducers';

import './index.css'

const store = createStore(rootReducers);

//ReactDOM render of components
ReactDOM.render(
<Provider store={store}>
  <App/>
</Provider> , document.getElementById('drum-machine')
);