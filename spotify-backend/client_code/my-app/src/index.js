/*import React, { Component } from 'react';
import { render }           from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk        from 'redux-thunk';
import { Provider } from 'react-redux';
//import { Router, Route, IndexRoute, HashRouter } from 'react-router-dom';
//import { syncHistory, routeReducer }     from 'react-router-redux';
//import { createHistory } from 'history';
import rootReducer from './reducers/index';
import App from './component/App';
//require('App.css');

//const reduxRouterMiddleware = syncHistory(hashHistory)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  //reduxRouterMiddleware
)(createStore)
const store = createStoreWithMiddleware(rootReducer)
//const store = createStore(rootReducer,window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk));

class Root extends Component {
  render() {
    console.log("at root", store);
    return (
      <Provider store={store}>
        <App/>       
      </Provider>
    );
  }
}
const rootElement = document.getElementById('root');
render(<Root />, rootElement);
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//import './style/style.css';
/*const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}*/

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));


