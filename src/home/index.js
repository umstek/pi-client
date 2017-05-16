import React, { Component, PropTypes } from 'react';
import { Card, Row, Col } from 'antd';
import Link from '../../components/Link';
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
      <PageLayout>
        <Row type="flex" justify="space-between" align="middle" style={{ padding: 25 }}>
          <Col span={6}>
            <Card title="Feed" extra={<Link to="/feed">Go</Link>} style={{ width: 300, height: 300 }}>
              <p>Feed contains articles that every student should read! </p>
              <p>Navigate to feed everyday and find important stuff. </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Timeline" extra={<Link to="/timeline">Go</Link>} style={{ width: 300, height: 300 }}>
              <p>Timeline shows the work you did, and the breaks you took. </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Calendar" extra={<Link to="/calendar">Go</Link>} style={{ width: 300, height: 300 }}>
              <p>Calendar manages your tasks and events. </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Syllabus" extra={<Link to="/syllabus">Go</Link>} style={{ width: 300, height: 300 }}>
              <p>Syllabus helps tracking your subjects and their content. </p>
            </Card>
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default HomePage;
