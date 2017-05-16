import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import PageLayout from '../../components/Layout';
import propTypes from '../../api/propTypes/article';
import { Card, Row, Col } from 'antd';

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
        <Helmet>
          <title>News Feed</title>
        </Helmet>
        {
          this.props.articles.map(article => (
            <Row type="flex" justify="space-around" style={{ padding: 30 }}>
              <Card title={article.title} extra={<h3>{article.author}</h3>} style={{ width: 800 }}>
                <div key={article.id}>
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </Card>
            </Row>
          ))
        }
      </PageLayout>
    );
  }

}

export default FeedPage;
