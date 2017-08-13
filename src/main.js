import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';
import enUS from 'antd/lib/locale-provider/en_US';

import reducers from './reducers';

import './index.scss';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

export { store, enUS, history };
