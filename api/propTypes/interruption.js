import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,

  reason: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
});

export default propTypes;
