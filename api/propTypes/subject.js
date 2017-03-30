import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  syllabusId: PropTypes.string,

  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  weight: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
});

export default propTypes;
