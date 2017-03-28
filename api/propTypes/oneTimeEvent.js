import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  subjectId: PropTypes.string,
  calendarId: PropTypes.string,

  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  location: PropTypes.string,

  startDateAndTime: PropTypes.string.isRequired,
  endDateAndTime: PropTypes.string.isRequired,
});

export default propTypes;