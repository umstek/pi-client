import React from 'react';
import { Icon, Menu } from 'antd';
import Link from '../Link/Link';

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
          <Link to="feed">
            <Icon type="solution" />
            Feed
          </Link>
        </MenuItem>
        <MenuItem key="timeline">
          <Link to="timeline">
            <Icon type="bars" />
            Timeline
          </Link>
        </MenuItem>
        <MenuItem key="calendar">
          <Link to="calendar">
            <Icon type="calendar" />
            Calendar
          </Link>
        </MenuItem>
        <MenuItem key="syllabus">
          <Link to="syllabus">
            <Icon type="book" />
            Syllabus
          </Link>
        </MenuItem>
        <MenuItem key="home">
          <Link to=".">
            <Icon type="home" />
            Home
          </Link>
        </MenuItem>
        <MenuItem key="settings" style={{ float: 'right' }}>
          <Link to="settings">
            <Icon type="setting" />
            Settings
          </Link>
        </MenuItem>
        <MenuItem key="profile" style={{ float: 'right' }}>
          <Link to="profile">
            <Icon type="user" />
            Profile
          </Link>
        </MenuItem>
      </AMenu>
    );
  }
}
export default Navigation;
