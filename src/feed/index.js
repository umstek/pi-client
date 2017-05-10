import React, { Component, PropTypes } from 'react';
import PageLayout from '../../components/Layout';
import propTypes from '../../api/propTypes/article';

class FeedPage extends Component {

  static propTypes = {
    articles: PropTypes.arrayOf(propTypes).isRequired,
  };

  componentDidMount() {
    document.title = 'Feed';
  }

  render() {
    return (
      <PageLayout>
        {
          this.props.articles.map(article => (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <h3>{article.author}</h3>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          ))
        }
      </PageLayout>
    );
  }

}

export default FeedPage;
