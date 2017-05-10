// eslint-disable-next-line import/no-unresolved, import/no-webpack-loader-syntax
import css from '!!style-loader!css-loader!./calendar.css';
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import CalendarHeatmap from 'react-calendar-heatmap';
import PageLayout from '../../components/Layout/Layout';

const customTooltipDataAttrs = { 'data-toggle': 'tooltip' };

class CalendarPage extends Component {

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  today = new Date();

  shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  generateRandomValues(count, date = this.today) {
    return [...Array(count).keys()].map(index => ({
      date: this.shiftDate(date, -index),
      count: CalendarPage.getRandomInt(1, 3),
    }));
  }

  gitlabClassForValue(value) {
    if (!value) {
      return 'color-empty';
    }
    return `color-gitlab-${value.count}`;
  }

  customTitleForValue(value) {
    return value ? `You're hovering over ${value.date.toDateString()} with value ${value.count}` : null;
  }

  customOnClick(value) {
    if (value) {
      alert(`Clicked on ${value.date.toDateString()} with value ${value.count}`);
    }
  }

  render() {
    return (
      <PageLayout>
        {/* <svg>*/}
        {/* <Tooltip overlay="okay">*/}
        {/* <rect height={10} width={10}></rect>*/}
        {/* </Tooltip>*/}
        {/* </svg>*/}
        <CalendarHeatmap
          values={this.generateRandomValues(100, this.today)}
          classForValue={this.gitlabClassForValue}
          titleForValue={this.customTitleForValue}
          tooltipDataAttrs={customTooltipDataAttrs}
          onClick={this.customOnClick}
        />
      </PageLayout>
    );
  }
}

export default CalendarPage;
