import React, { PropTypes, Component } from 'react';
import { Tooltip, Layout } from 'antd';
import PageLayout from '../../components/Layout';
import Timer from '../../components/Timer/Timer';

class TimerPage extends Component {
  render() {
    return (
      <PageLayout>
        <Layout style={{ backgroundColor: 'white' }} >
          <Timer hours={0} minutes={25} seconds={0} />
        </Layout>
      </PageLayout>
    );
  }
}

export default TimerPage;
