import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, range } from 'lodash';
import { DatePicker, Form, Icon, Input, Select, Spin, Switch, TimePicker, Slider } from 'antd';

import env from '../../src/env.json';
import store from '../../src/store';

const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const { RangePicker } = DatePicker;

class CreateEvent extends Component {
  // noinspection JSUnresolvedFunction
  static propTypes = {
    form: PropTypes.objectOf(Form).isRequired,
  };

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchSubject = debounce(this.fetchSubject, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  fetchSubject = (value) => {
    console.log('fetching subject', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ fetching: true });
    // noinspection JSUnresolvedVariable
    fetch(`${env.baseUrl}/Subjects?access_token=${store.getState().login.accessToken}`)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        console.log(body);
        const data = body.map(subject => ({
          text: `${subject.name} (${subject.desc})`,
          value: subject.id,
          fetching: false,
        }));
        this.setState({ data });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onOneTimeDnTRangeChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  onOneTimeDnTRangeOk = (value) => {
    console.log('onOk: ', value);
  };

  onRecurringDateStartEndChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  onRecurringDateStartEndOk = (value) => {
    console.log('onOk: ', value);
  };

  onRecurringStartTimeChange = (value, timeString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', timeString);
  };

  onRecurringStartTimeOk = (value) => {
    console.log('onOk: ', value);
  };

  onRecurringDuration = (value) => {
    console.log('onOk: ', value);
  };

  render() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fetching, data, value } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name for the subject!' }],
          })(
            <Input prefix={<Icon type="book" style={{ fontSize: 13 }} />} placeholder="Name" />,
          )}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('desc', {
            rules: [{ required: false, message: 'Please input some description!' }],
          })(
            <Input prefix={<Icon type="info" style={{ fontSize: 13 }} />} placeholder="Description" type="textarea" />,
          )}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('location', {
            rules: [{ required: false, message: 'Please input a location!' }],
          })(
            <Input prefix={<Icon type="environment-o" style={{ fontSize: 13 }} />} placeholder="Location" />,
          )}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('subjectId', {
            rules: [{ required: false, message: 'Please select a subject.' }],
          })(
            <Select
              mode="combobox"
              labelInValue
              value={value}
              placeholder="Subject"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchSubject}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {data.map(d => <Option value={d.text} key={d.value}>{d.text}</Option>)}
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Recurrence">
          {getFieldDecorator('recurrence', {
            initialValue: false,
          })(
            <Switch
              checkedChildren={<span><Icon type="reload" /> Repeat</span>}
              unCheckedChildren={<span>One-Time <Icon type="verticle-left" /></span>}
            />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Date-Time range">
          {getFieldDecorator('oneTimeDnTRange', {})(
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['Start Time', 'End Time']}
              onChange={this.onOneTimeDnTRangeChange}
              onOk={this.onOneTimeDnTRangeOk}
            />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Start-End dates">
          {getFieldDecorator('recurringDateStartEnd', {})(
            <RangePicker
              format="YYYY-MM-DD"
              placeholder={['Start Date', 'End Date']}
              onChange={this.onRecurringDateStartEndChange}
              onOk={this.onRecurringDateStartEndOk}
            />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Event start time">
          {getFieldDecorator('recurringStartTime', {})(
            <TimePicker
              format="HH:mm"
              onChange={this.onRecurringStartTimeChange}
              onOk={this.onRecurringStartTimeOk}
            />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Duration (Minutes)">
          {getFieldDecorator('recurringDuration', { initialValue: 60 })(
            <Slider
              min={15}
              max={360}
              step={5}
              onChange={this.onRecurringDuration}
            />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Interval">
          {getFieldDecorator('recurringInterval', { initialValue: 'weekly' })(
            <Select
              mode="combobox"
            >
              <Option key="monthly">Monthly</Option>
              <Option key="weekly">Weekly</Option>
              <Option key="daily">Daily</Option>
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Multiplier">
          {getFieldDecorator('recurringMultiplier', { initialValue: 1 })(
            <Slider
              min={1}
              max={(() => {
                switch (getFieldValue('recurringInterval')) {
                  case 'monthly':
                    return 12;
                  case 'weekly':
                    return 4;
                  case 'daily':
                    return 7;
                  default:
                    return 1;
                }
              })()}
              step={1}
            />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Criteria">
          {getFieldDecorator('recurringCriteria', {})(
            <Select mode="multiple">
              {(() => {
                switch (getFieldValue('recurringInterval')) {
                  case 'monthly':
                    return ([
                      <OptGroup label="Date">
                        {range(1, 31, 1).map(day => <Option key={day}>{day}</Option>)}
                      </OptGroup>,
                      <OptGroup label="Every 1st">
                        {days.map(day => <Option key={`1:${day}`}>{`Every 1st ${day}`}</Option>)}
                      </OptGroup>,
                      <OptGroup label="Every 2nd">
                        {days.map(day => <Option key={`2:${day}`}>{`Every 2nd ${day}`}</Option>)}
                      </OptGroup>,
                      <OptGroup label="Every 3rd">
                        {days.map(day => <Option key={`3:${day}`}>{`Every 3rd ${day}`}</Option>)}
                      </OptGroup>,
                      <OptGroup label="Every 4th">
                        {days.map(day => <Option key={`4:${day}`}>{`Every 4th ${day}`}</Option>)}
                      </OptGroup>,
                    ]);
                  case 'weekly':
                    return days.map(day => <Option key={day}>{day}</Option>);
                  default:
                    return [];
                }
              })()}
            </Select>,
          )}
        </FormItem>

      </Form>
    );
  }
}

const CreateEventForm = Form.create()(CreateEvent);

export default CreateEventForm;
