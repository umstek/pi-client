/**
 * Created by wickramaranga on 3/24/17.
 */

import React, { PropTypes, Component } from 'react';
import { Timeline, Tooltip, Layout } from 'antd';
import PageLayout from '../../components/Layout';

const TimeItem = Timeline.Item;

class TimelinePage extends Component {
  render() {
    return (
      <PageLayout>
        <Layout style={{ backgroundColor: 'white' }}>
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
                                <p>{item.startTime}</p>
                                <p>{item.endTime}</p>
                              </div>
                            )
                            :
                            (
                              <div>
                                <p>{item.startTime}</p>
                                <p>{item.endTime}</p>
                                <p>{item.rating}</p>
                              </div>
                            )
                        }
                      </div>}
                    >
                      {item.properlyEnded === undefined ? 'Break' : 'Session'} {item.startTime}
                    </Tooltip>
                  </TimeItem>,
                )
            }
          </Timeline>
        </Layout>
      </PageLayout>
    );
  }
}

export default TimelinePage;
