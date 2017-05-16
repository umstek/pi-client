import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PageLayout from '../../components/Layout';
import CreateTask from '../../components/CreateTask';

class CreateTaskPage extends Component {
  render() {
    return (
      <PageLayout>
        <Helmet>
          <title>Create a new task</title>
        </Helmet>
        <CreateTask />
      </PageLayout>
    );
  }
}

export default CreateTaskPage;
