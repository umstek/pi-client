import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  timelineId: PropTypes.string,

  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
});

export default propTypes;
