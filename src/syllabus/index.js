import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SyllabusType from '../../api/propTypes/syllabus';
import PageLayout from '../../components/Layout';
import Syllabus from '../../components/Syllabus';

class SyllabusPage extends Component {
  static propTypes = {
    syllabuses: PropTypes.arrayOf(SyllabusType),
  };

  render() {
    const syllabus = this.props.syllabuses
      .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))[0];

    return (
      <PageLayout>
        <Syllabus syllabus={syllabus} />
      </PageLayout>
    );
  }
}

export default SyllabusPage;
