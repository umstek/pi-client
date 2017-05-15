import React, { Component } from 'react';
import PageLayout from '../../components/Layout';
import CreateTimer from '../../components/CreateTimer';

class CreateTimerPage extends Component {
  render() {
    return (
      <PageLayout>
        <CreateTimer />
      </PageLayout>
    );
  }
}

export default CreateTimerPage;
