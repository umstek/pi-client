import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { ConnectedRouter } from 'react-router-redux';
// import {Route} from 'react-router-dom';

import { store, enUS, history } from './main';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <ConnectedRouter history={history} />
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
