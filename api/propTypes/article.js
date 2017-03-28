import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  contentAuthorId: PropTypes.string,

  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});

export default propTypes;
