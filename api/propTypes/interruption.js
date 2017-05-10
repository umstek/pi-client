import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  id: PropTypes.string,

  reason: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
});

export default propTypes;
