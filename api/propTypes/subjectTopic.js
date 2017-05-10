import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  subjectId: PropTypes.string,
  subjectTopicId: PropTypes.string,

  desc: PropTypes.string.isRequired,
  status: PropTypes.string,
});

export default propTypes;
