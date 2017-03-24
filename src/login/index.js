/**
 * Created by wickramaranga on 3/24/17.
 */

import 'antd/dist/antd.css';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import LoginForm from '../../components/Login/Login';

class LoginPage extends React.Component {

  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  componentDidMount() {
    // document.title = title;
  }

  render() {
    return (
      <Layout>
        <LoginForm />
      </Layout>
    );
  }
}

export default LoginPage;
