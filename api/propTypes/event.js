import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  subjectId: PropTypes.string,
  calendarId: PropTypes.string,

  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  location: PropTypes.string,
});

export default propTypes;
