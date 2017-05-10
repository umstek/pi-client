import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  id: PropTypes.string,

  username: PropTypes.string,
  email: PropTypes.string,
  emailVerified: PropTypes.bool,
});

export default propTypes;
