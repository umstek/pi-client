import React, { PropTypes, Component } from 'react';
import { Tooltip, Layout } from 'antd';
import Helmet from 'react-helmet';
import PageLayout from '../../components/Layout';
import Timer from '../../components/Timer/Timer';

class TimerPage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { hh, mm, ss } = this.props.route.params;
    return (
      <PageLayout>
        <Helmet>
          <title>Timer running...</title>
        </Helmet>
        <Layout style={{ backgroundColor: 'white' }}>
          <Timer hours={parseInt(hh, 10)} minutes={parseInt(mm, 10)} seconds={parseInt(ss, 10)} />
        </Layout>
      </PageLayout>
    );
  }
}

export default TimerPage;
