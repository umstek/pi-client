import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import SyllabusType from '../../api/propTypes/syllabus';
import Subject from '../../components/Syllabus/Subject';

import store from '../../src/store';
import env from '../../src/env.json';

const { Header, Footer, Sider, Content } = Layout;
const AMenu = Menu;
const MenuItem = Menu.Item;

class Syllabus extends Component {
  static propTypes = {
    syllabus: SyllabusType,
  };

  constructor(props) {
    super(props);

    fetch(`${env.baseUrl}/Syllabuses/${this.props.syllabus.id}/subjects?${store.getState().login.accessToken}`)
      .then((response) => {
        if (response.ok) {
          Promise.resolve(response.json())
            .then((value) => {
              this.setState({ ...this.state, subjects: value });
            });
        }
      });
  }

  state = {
    subjects: [],
  };

  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <AMenu theme="light" mode="vertical">
            {
              this.state.subjects.map(subject =>
                <MenuItem key={subject.id}>
                  <Icon type="book" />
                  <span className="nav-text">{subject.name}</span>
                </MenuItem>,
              )
            }
          </AMenu>
        </Sider>
        <Subject />
      </Layout>
    );
  }
}

export default Syllabus;
