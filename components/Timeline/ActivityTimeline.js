import React, { Component, PropTypes } from 'react';
import { Timeline, Tooltip } from 'antd';

import taskPT from '../../api/propTypes/task';
import sessionPT from '../../api/propTypes/session';
import breakPT from '../../api/propTypes/break';

/**
 * @type {React.ReactNode}
 */
const Item = Timeline.Item;

/**
 * @param item {object}
 * @returns {string}
 */
const determineType = (item) => {
  if (item.deadline) {
    return 'Tasks';
  } else if (item.properlyEnded) {
    return 'Sessions';
  } else {
    return 'Breaks';
  }
};

/**
 * @param a {object}
 * @param b {object}
 * @param sortByEndTime {boolean}
 * @returns {number}
 */
const timeOrder = (a, b, sortByEndTime) => {
  let aTime;
  if (determineType(a) === 'Tasks') {
    aTime = a.deadline;
  } else {
    aTime = sortByEndTime ? a.endTime : a.startTime;
  }

  let bTime;
  if (determineType(b) === 'Tasks') {
    bTime = b.deadline;
  } else {
    bTime = sortByEndTime ? b.endTime : b.startTime;
  }

  return new Date(aTime) - new Date(bTime);
};

class ActivityTimeline extends Component {

  static propTypes = {
    tasks: PropTypes.arrayOf(taskPT),
    sessions: PropTypes.arrayOf(sessionPT),
    breaks: PropTypes.arrayOf(breakPT),
  };

  render() {
    return (
      <Timeline>
        {
          [...this.props.tasks, ...this.props.sessions, ...this.props.breaks]
            .sort(timeOrder)
            .map((item) => {
              const itemType = determineType(item);

            })
        }
      </Timeline>
    );
  }

}

export default ActivityTimeline;
