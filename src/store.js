import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import { LOGIN, LOGOUT } from './actionTypes';

function login(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.id,
        userId: action.userId,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

function rehydrate(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }
    default:
      return state;
  }
}

const reducer = combineReducers({ login, rehydrate });
const store = createStore(reducer, undefined,
  compose(applyMiddleware(), autoRehydrate()),
);

persistStore(store);

export default store;
