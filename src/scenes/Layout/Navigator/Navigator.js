import React, { Component } from 'react';
import { Menu } from 'antd';
import { push } from 'react-router-redux';

const MenuItem = Menu.Item;

const anonymousItems = [
  <MenuItem key="login">Login</MenuItem>,
  <MenuItem key="register">Sign Up</MenuItem>
];
const authenticatedItems = [
  <MenuItem key="profile">Profile</MenuItem>,
  <MenuItem key="settings">Settings</MenuItem>
];
const authorItems = [
  <MenuItem key="articles">Articles</MenuItem>,
  <MenuItem key="statistics">Statistics</MenuItem>
];
const studentItems = [
  <MenuItem key="feed">Feed</MenuItem>,
  <MenuItem key="calendar">Calendar</MenuItem>,
  <MenuItem key="timeline">Timeline</MenuItem>
];

class Navigator extends Component {
  props: {
    userType: string,
    dispatch: ({ type: string, [name: string]: any }) => void
  };

  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        onSelect={({ item, key, selectedKeys }) =>
          this.props.dispatch(push(`/${key}`))}
      >
        {!this.props.userType ? anonymousItems : []}
        {this.props.userType === 'author' ? authorItems : []}
        {this.props.userType === 'student' ? studentItems : []}
        {this.props.userType ? authenticatedItems : []}
      </Menu>
    );
  }
}

export default Navigator;
