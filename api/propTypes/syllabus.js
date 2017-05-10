import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  studentId: PropTypes.string,

  startDate: PropTypes.string,
  endDate: PropTypes.string,
});

export default propTypes;
