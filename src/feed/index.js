import React, { Component, PropTypes } from 'react';
import {} from 'antd';
import PageLayout from '../../components/Layout';

class FeedPage extends Component {

  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      contentAuthorId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  componentDidMount() {
    document.title = 'Feed';
  }
  render() {
    return (
      <PageLayout>
        {
          this.props.articles.map((article) => {
            return <div>
              <h2>{article.title}</h2>
              <h3>{article.author}</h3>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>;
          })
        }
      </PageLayout>
    );
  }

}

export default FeedPage;
