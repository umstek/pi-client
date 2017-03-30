import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  eventId: PropTypes.string,
  recurringEventId: PropTypes.string,
  oneTimeEventId: PropTypes.string,
  subjectTopicId: PropTypes.string,
  calendarId: PropTypes.string,

  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  estTime: PropTypes.number,
  deadline: PropTypes.string,
});

export default propTypes;
