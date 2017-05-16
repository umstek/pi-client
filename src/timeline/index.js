import React, { Component } from 'react';
import { Timeline, Tooltip, Layout, Button } from 'antd';
import PageLayout from '../../components/Layout';
import TimerManager from '../../components/TimerManager';

const TimeItem = Timeline.Item;
const Footer = Layout.Footer;

class TimelinePage extends Component {
  render() {
    return (
      <PageLayout>
        <Layout style={{ backgroundColor: 'white', padding: 25 }}>
          <Timeline>
            {
              [...this.props.breaks, ...this.props.sessions]
                .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                .map(item =>
                  <TimeItem key={item.id} color={item.properlyEnded === undefined ? 'blue' : 'green'}>
                    <Tooltip
                      placement="right"
                      title={<div>
                        {
                          item.properlyEnded === undefined
                            ?
                            (
                              <div>
                                <p>{new Date(item.startTime).toLocaleString()}</p>
                                <p>{new Date(item.endTime).toLocaleString()}</p>
                              </div>
                            )
                            :
                            (
                              <div>
                                <p>{new Date(item.startTime).toLocaleString()}</p>
                                <p>{new Date(item.endTime).toLocaleString()}</p>
                                <p>{`Rating: ${item.rating}`}</p>
                              </div>
                            )
                        }
                      </div>}
                    >
                      {item.properlyEnded === undefined ? 'Break' : 'Session'} {new Date(item.startTime).toLocaleString()}
                    </Tooltip>
                  </TimeItem>,
                )
            }
          </Timeline>
        </Layout>
        <Footer>
          <TimerManager />
        </Footer>
      </PageLayout>
    );
  }
}

export default TimelinePage;
