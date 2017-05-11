import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { DatePicker, Form, Icon, Input, InputNumber, Select, Spin } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class CreateTask extends Component {
  static propTypes = {
    form: PropTypes.objectOf(Form).isRequired,
  };

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchEvent = debounce(this.fetchEvent, 800);
    this.fetchTopic = debounce(this.fetchEvent, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchEvent = (value) => {

  };

  fetchTopic = (value) => {

  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue, setFieldValue } = this.props.form;
    const { fetching, data, value } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name for the task!' }],
          })(
            <Input prefix={<Icon type="check" style={{ fontSize: 13 }} />} placeholder="Name" />,
          )}
        </FormItem>

        <FormItem {...formItemLayout}>
          {getFieldDecorator('desc', {
            rules: [{ required: false, message: 'Please input some description!' }],
          })(
            <Input prefix={<Icon type="info" style={{ fontSize: 13 }} />} placeholder="Description" />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Estimated duration">
          {getFieldDecorator('estTime', {
            initialValue: 60,
            rules: [{ required: true, message: 'Please select duration.' }],
          })(
            <InputNumber min={5} max={300} />,
          )}
          <span className="ant-form-text"> minutes</span>
        </FormItem>

        <FormItem {...formItemLayout} label="Deadline">
          {getFieldDecorator('deadline', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Attached to" hasFeedback>
          {getFieldDecorator('attachedTo', {
            initialValue: 'Event',
            rules: [{ required: true, message: 'Please select an event or a topic to attach the task. ' }],
          })(
            <Select placeholder="Please select an item">
              <Option value="Event">Event</Option>
              <Option value="Topic">Subject Topic</Option>
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={getFieldValue('attachedTo')}>
          {getFieldDecorator('attach', {
            rules: [{ required: true, message: `Please select ${getFieldValue('attachedTo').toLowerCase()}` }],
          })(
            <Select
              labelInValue
              value={value}
              placeholder={`Select ${getFieldValue('attachedTo').toLowerCase()}`}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={getFieldValue('attachedTo') === 'Event' ? this.fetchEvent : this.fetchTopic}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {data.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>,
          )}
        </FormItem>

      </Form>
    );
  }
}

const CreateTaskForm = Form.create()(CreateTask);

export default CreateTaskForm;
