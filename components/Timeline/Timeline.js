import React, { Component, PropTypes } from 'react';
import { Timeline } from 'antd';

class ActivityTimeline extends Component {

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({

    })).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      taskId: PropTypes.string,
      timelineId: PropTypes.string,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      properlyEnded: PropTypes.bool.isRequired,
      rating: PropTypes.number,
      _interruptions: PropTypes.arrayOf(PropTypes.shape({
        reason: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        id: PropTypes.string,
      })),
    })).isRequired,
    breaks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      timelineId: PropTypes.string,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    return (
      <Timeline />
    );
  }

}

export default ActivityTimeline;
