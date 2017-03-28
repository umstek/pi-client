import { PropTypes } from 'react';

const propTypes = PropTypes.shape({
  id: PropTypes.string,
  subjectId: PropTypes.string,
  calendarId: PropTypes.string,

  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  location: PropTypes.string,

  time: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,

  extra: PropTypes.arrayOf(PropTypes.shape({
    startDateTime: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  })),

  except: PropTypes.arrayOf(PropTypes.string),
});

export default propTypes;
