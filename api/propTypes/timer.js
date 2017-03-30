import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  studentId: PropTypes.string,

  type: PropTypes.oneOf(['Work', 'Break']).isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  duration: PropTypes.number.isRequired,
});

export default propTypes;
