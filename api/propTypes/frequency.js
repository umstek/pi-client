import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,

  interval: PropTypes.oneOf(['Day', 'Week', 'Month']).isRequired,
  multiplier: PropTypes.number.isRequired,
  criteria: PropTypes.string.isRequired,
});

export default propTypes;
