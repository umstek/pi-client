import React, { Component } from 'react';
import { Timeline, Tooltip, Layout, Button } from 'antd';
import Helmet from 'react-helmet';
import PageLayout from '../../components/Layout';
import Link from '../../components/Link/Link';

const TimeItem = Timeline.Item;
const Footer = Layout.Footer;

class CalendarPage extends Component {
  render() {
    return (
      <PageLayout>
        <Helmet>
          <title>Task Calendar</title>
        </Helmet>
        <Layout style={{ backgroundColor: 'white', padding: 25 }}>
          <Timeline>
            {
              [...this.props.tasks]
                .filter(a => new Date(a.deadline) > new Date())
                .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
                .map(item =>
                  <TimeItem key={item.id} color="orange">
                    <Tooltip
                      placement="right"
                      title={
                        <div>
                          <strong>{item.desc}</strong>
                          <p>{new Date(item.deadline).toLocaleString()}</p>
                        </div>
                      }
                    >
                      {item.name}
                    </Tooltip>
                  </TimeItem>,
                )
            }
          </Timeline>
        </Layout>
        <Footer>
          <Link to="/tasks/create">Create a new task</Link>
        </Footer>
      </PageLayout>
    );
  }
}

export default CalendarPage;
