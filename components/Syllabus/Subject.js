import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

class Subject extends React.Component {

  render() {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h2>Subject</h2>
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
