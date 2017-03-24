import React from 'react';
import { Menu, Icon } from 'antd';

const AMenu = Menu;
// const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
// const MenuItemGroup = Menu.ItemGroup;

class Navigation extends React.Component {
  state = {
    current: 'mail',
  };
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <AMenu
        theme="dark"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <MenuItem key="feed">
          <Icon type="solution" />
          Feed
        </MenuItem>
        <MenuItem key="timeline">
          <Icon type="bars" />
          Timeline
        </MenuItem>
        <MenuItem key="calendar">
          <Icon type="calendar" />
          Calendar
        </MenuItem>
        <MenuItem key="syllabus">
          <Icon type="book" />
          Syllabus
        </MenuItem>
        <MenuItem key="home">
          <Icon type="home" />
          Home
        </MenuItem>
        <MenuItem key="profile" style={{ float: 'right' }}>
          <Icon type="user" />
          Profile
        </MenuItem>
        <MenuItem key="settings" style={{ float: 'right' }}>
          <Icon type="setting" />
          Settings
        </MenuItem>
      </AMenu>
    );
  }
}
export default Navigation;
