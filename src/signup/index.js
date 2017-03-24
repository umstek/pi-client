/**
 * Created by wickramaranga on 3/24/17.
 */

import React, { PropTypes } from 'react';
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
        <SignupForm />
      </Layout>
    );
  }
}

export default SignupPage;
