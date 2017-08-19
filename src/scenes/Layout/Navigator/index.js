import React, { Component } from 'react';
import { Menu } from 'antd';

const MenuItem = Menu.Item;

class Navigator extends Component {
  // Intelligent
  render() {
    return (
      <Menu mode="horizontal" theme="dark">
        <MenuItem key="profile">Profile</MenuItem>
        <MenuItem key="settings">Settings</MenuItem>
      </Menu>
    );
  }
}

export default Navigator;
