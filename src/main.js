import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  routerMiddleware as createRouterMiddleware,
  routerReducer
} from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';
import enUS from 'antd/lib/locale-provider/en_US';

import reducers from './reducers';
// eslint-disable-next-line
import sagas from './sagas';

import './index.scss';

const history = createHistory();
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(routerMiddleware, sagaMiddleware)
);

// sagaMiddleware.run(sagas);

export { store, enUS, history };
