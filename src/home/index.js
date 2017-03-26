import React, { Component, PropTypes } from 'react';
import PageLayout from '../../components/Layout';

class HomePage extends Component {

  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  componentDidMount() {
    document.title = 'Home';
  }

  render() {
    return (
      <PageLayout />
    );
  }
}

export default HomePage;
