import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import reducers from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <App dispatch={store.dispatch} />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
