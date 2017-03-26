import React, { PropTypes } from 'react';
import PageLayout from '../../components/Layout';

class HomePage extends React.Component {

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
      <PageLayout />
    );
  }
}

export default HomePage;
