import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import SignupForm from '../../components/Signup';

class SignupPage extends React.Component {

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
          <title>Create an account</title>
        </Helmet>
        <SignupForm />
      </Layout>
    );
  }
}

export default SignupPage;
