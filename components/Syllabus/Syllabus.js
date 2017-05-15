import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Button, Modal } from 'antd';

import SyllabusType from '../../api/propTypes/syllabus';
import CreateSubjectForm from '../../components/CreateSubject';
import Subject from '../../components/Syllabus/Subject';

import store from '../../src/store';
import env from '../../src/env.json';
import history from '../../src/history';

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
    selectedSubject: null,
    addSubjectVisible: false,
    addSubjectLoading: false,
  };

  selectSubject = ({ item, key, selectedKeys }) => {
    const newState = {
      ...this.state,
      selectedSubject: this.state.subjects.filter(subject => subject.id === key)[0],
    };

    this.setState(newState);

    this.forceUpdate();
  };

  showModal = () => {
    this.setState({ ...this.state, addSubjectVisible: true });
  };

  addSubjectOk = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      fetch(`${env.baseUrl}/Syllabuses/${this.props.syllabus.id}/subjects?${store.getState().login.accessToken}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(values),
        })
        .then((response) => {
          if (response.ok) {
            Modal.success({
              title: 'Success',
              content: 'Subject added. ',
              onOk() {
                // Closing of modal is handled by immediately resolving a promise.
                return new Promise((resolve) => {
                  history.push('/syllabus');
                  Promise.resolve(response.json()).then((value) => {
                    console.log(value);
                  });
                  resolve();
                });
              },
            });
          } else {
            Modal.warn({
              title: response.statusText,
              content: 'Cannot add subject. Please try again later. ',
            });
          }
        });

      form.resetFields();

      this.setState({ ...this.state, addSubjectLoading: false, addSubjectVisible: false });
    });
  };

  addSubjectCancel = () => {
    this.setState({ ...this.state, addSubjectLoading: false, addSubjectVisible: false });
  };

  createSubjectFormRef = (form) => {
    this.form = form;
  };

  render() {
    return (
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <AMenu theme="light" mode="vertical" selectable onSelect={this.selectSubject}>
            {
              this.state.subjects.map(subject =>
                <MenuItem key={subject.id}>
                  <Icon type="book" />
                  <span className="nav-text">{subject.name}</span>
                </MenuItem>,
              )
            }
          </AMenu>

          <Button onClick={this.showModal}>
            Create a subject
          </Button>
          <CreateSubjectForm
            ref={this.createSubjectFormRef}
            visible={this.state.addSubjectVisible}
            loading={this.state.addSubjectLoading}
            onCancel={this.addSubjectCancel}
            onOk={this.addSubjectOk}
          />

        </Sider>
        <Subject
          subject={this.state.selectedSubject}
          key={this.state.selectedSubject ? this.state.selectedSubject.id : ''}
        />
      </Layout>
    );
  }
}

export default Syllabus;
