import React, { Component, PropTypes } from 'react';
import PageLayout from '../../components/Layout';
import propTypes from '../../api/propTypes/article';
import { Card } from 'antd';

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
            <Card title={article.title} extra={<h3>{article.author}</h3>} style={{ width: 800 }}>
              <div key={article.id}>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </Card>
          ))
        }
      </PageLayout>
    );
  }

}

export default FeedPage;
