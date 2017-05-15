import React, { Component } from 'react';
import { Button, Tag } from 'antd';
import PropTypes from 'prop-types';

import store from '../../src/store';
import env from '../../src/env.json';
import history from '../../src/history';
import Link from '../Link/Link';

class TimerManager extends Component {
  constructor(props) {
    super(props);

    fetch(`${env.baseUrl}/Timers?${store.getState().login.accessToken}`)
      .then((response) => {
        if (response.ok) {
          Promise.resolve(response.json())
            .then((value) => {
              this.setState({ ...this.state, timers: value });
            });
        }
      });
  }

  state = {
    timers: [],
  };

  navigate = (e) => {
    history.push(`/timer/${0}/${this.state.timers.filter(timer => timer.id === e)[0].duration}/${0}`);
  };

  render() {
    return (
      <div>
        {
          this.state.timers.map(
            timer => (
              <Button key={timer.id} type={timer.type ? 'primary' : 'dashed'} onClick={() => this.navigate(timer.id)}>
                <div>
                  <span>{timer.name}: </span>
                  <span>{timer.desc}</span>
                </div>
              </Button>
            ),
          )
        }
        <Link to="/timer/create" style={{ paddingLeft: 20 }}>Add</Link>
      </div>
    );
  }
}

export default TimerManager;
