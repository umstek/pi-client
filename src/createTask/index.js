import React, { Component } from 'react';
import PageLayout from '../../components/Layout';
import CreateTask from '../../components/CreateTask';

class CreateTaskPage extends Component {
  render() {
    return (
      <PageLayout>
        <CreateTask />
      </PageLayout>
    );
  }
}

export default CreateTaskPage;
