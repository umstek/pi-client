import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Tree } from 'antd';

import SubjectType from '../../api/propTypes/syllabus';

import store from '../../src/store';
import env from '../../src/env.json';

const { Header, Footer, Content } = Layout;
const TreeNode = Tree.TreeNode;

function loop(data) {
  return data.map((item) => {
    if (item.children) {
      return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
    }
    return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />;
  });
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const recurse = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          recurse(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  recurse(treeData);
  setLeaf(treeData, curKey, level);
}

class Subject extends Component {
  static propTypes = {
    subject: SubjectType,
  };

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      subject: this.props.subject || null,
      subjectTopics: [],
      treeData: [],
    };

    if (this.props.subject !== null) {
      fetch(`${env.baseUrl}/Subjects/${this.props.subject.id}/subjectTopics?${store.getState().login.accessToken}`)
        .then((response) => {
          if (response.ok) {
            Promise.resolve(response.json())
              .then((value) => {
                this.setState({
                  ...this.state,
                  subjectTopics: value,
                  treeData: value.map(topic => ({ name: topic.desc, key: topic.id })),
                });
              });
          }
        });
    }
  }

  state = {
    subject: null,
    subjectTopics: [],
    treeData: [],
  };

  onLoadData = (treeNode) => {
    fetch(`${env.baseUrl}/SubjectTopics/${treeNode.props.eventKey}/subjectTopics?${store.getState().login.accessToken}`)
      .then((response) => {
        if (response.ok) {
          Promise.resolve(response.json())
            .then((value) => {
              const newTreeData = value.map(topic => ({ name: topic.desc, key: topic.id }));

              const treeData = [...this.state.treeData];
              getNewTreeData(treeData, treeNode.props.eventKey, newTreeData, 2);

              this.setState({
                ...this.state,
                treeData,
              });
            });
        }
      });
  };

  render() {
    if (this.state.subject === null) {
      return (
        <Layout>
          <h2>Select a subject</h2>
        </Layout>
      );
    }

    console.log(this.state);
    const treeNodes = loop(this.state.treeData);

    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>{this.state.subject.name}</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
              {treeNodes}
            </Tree>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }

}

export default Subject;
