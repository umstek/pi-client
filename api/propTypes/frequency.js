import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  id: PropTypes.string,

  interval: PropTypes.oneOf(['Day', 'Week', 'Month']).isRequired,
  multiplier: PropTypes.number.isRequired,
  criteria: PropTypes.string.isRequired,
});

export default propTypes;
