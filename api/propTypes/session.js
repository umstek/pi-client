import PropTypes from 'prop-types';
import interruptionPropType from './interruption';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  taskId: PropTypes.string,
  timelineId: PropTypes.string,

  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  properlyEnded: PropTypes.bool.isRequired,
  rating: PropTypes.number,

  _interruptions: PropTypes.arrayOf(
    interruptionPropType,
  ),
});

export default propTypes;
