import React, { Component } from 'react';
import { Layout } from 'antd';
import Navigator from './Navigator';

const { Header, Content, Footer } = Layout;

class PageLayout extends Component {
  // Dumb
  render() {
    return (
      <Layout>
        <Header>
          <Navigator />
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>&copy; 2017 UMSTeK&trade;. All rights reserved.</Footer>
      </Layout>
    );
  }
}

export default PageLayout;
