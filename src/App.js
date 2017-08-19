import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import { store, enUS, history } from './main';
import './App.scss';
import PageLayout from './scenes/Layout/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <ConnectedRouter history={history}>
            <PageLayout>
              <Route exact path="/" component={Button} />
              <Route path="/editor" component={Input} />
            </PageLayout>
          </ConnectedRouter>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
