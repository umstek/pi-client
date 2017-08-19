import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import { store, enUS, history } from './main';
import PageLayout from './scenes/Layout/index';
import LoginForm from './scenes/pages/Login';
import PrivilegedRoute from './components/PrivilegedRoute/index';

import './App.scss';
import SignupForm from './scenes/pages/SignUp/index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <ConnectedRouter history={history}>
            <PageLayout>
              <Route exact path="/" component={Button} />
              <Route exact path="/help" component={Button} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={SignupForm} />

              <PrivilegedRoute exact path="/profile" component={Input} />
              <PrivilegedRoute exact path="/settings" component={Input} />

              <PrivilegedRoute path="/articles" component={Input} />
              <PrivilegedRoute path="/statistics" component={Input} />

              <PrivilegedRoute path="/feed" component={Input} />
              <PrivilegedRoute path="/calendar" component={Input} />
              <PrivilegedRoute path="/timeline" component={Input} />
              <PrivilegedRoute path="/syllabus" component={Input} />
            </PageLayout>
          </ConnectedRouter>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
