import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import LoginForm from '../../components/Login';

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
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginForm />
      </Layout>
    );
  }
}

export default LoginPage;
