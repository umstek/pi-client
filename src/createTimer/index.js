import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PageLayout from '../../components/Layout';
import CreateTimer from '../../components/CreateTimer';

class CreateTimerPage extends Component {
  render() {
    return (
      <PageLayout>
        <Helmet>
          <title>Create a new timer template</title>
        </Helmet>
        <CreateTimer />
      </PageLayout>
    );
  }
}

export default CreateTimerPage;
