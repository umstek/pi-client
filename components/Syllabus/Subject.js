import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import SubjectType from '../../api/propTypes/syllabus';

import store from '../../src/store';
import env from '../../src/env.json';

const { Header, Footer, Content } = Layout;

class Subject extends Component {
  static propTypes = {
    subject: SubjectType,
  };

  constructor(props) {
    super(props);

    this.state = {
      subject: this.props.subject || null,
    };

    if (this.props.subject !== null) {
      fetch(`${env.baseUrl}/Subjects/${this.props.subject.id}/subjectTopics?${store.getState().login.accessToken}`)
        .then((response) => {
          if (response.ok) {
            Promise.resolve(response.json())
              .then((value) => {
                console.log(value);
                this.setState({ ...this.state, subjectTopics: value });
              });
          }
        });
    }
  }

  state = {
    subject: null,
    subjectTopics: [],
  };

  render() {
    if (this.state.subject === null) {
      return (
        <Layout>
          <h2>Select a subject</h2>
        </Layout>
      );
    }

    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>{this.state.subject.name}</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Dummy content
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }

}

export default Subject;
