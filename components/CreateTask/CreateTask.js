import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Button, DatePicker, Form, Icon, Input, InputNumber, Modal, Select, Spin } from 'antd';

import history from '../../src/history';
import store from '../../src/store';
import env from '../../src/env.json';

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
    console.log('fetching topics', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ fetching: true });
    // noinspection JSUnresolvedVariable
    fetch(`${env.baseUrl}/SubjectTopics?access_token=${store.getState().login.accessToken}`)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        console.log(body);
        const data = body.map(topic => ({
          text: `${topic.desc}`,
          value: topic.id,
          fetching: false,
        }));
        this.setState({ data });
      });
  };

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const processedValues =
          values.attachedTo === 'Event' ? {
            name: values.name,
            desc: values.desc,
            estTime: values.estTime,
            deadline: values.deadline,
            eventId: values.attach,
          } : {
            name: values.name,
            desc: values.desc,
            estTime: values.estTime,
            deadline: values.deadline,
            subjectTopicId: values.attach,
          };

        fetch(`${env.baseUrl}/Tasks?${store.getState().login.accessToken}`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(processedValues),
          })
          .then((response) => {
            if (response.ok) {
              Modal.success({
                title: 'Success',
                content: 'Task added. ',
                onOk() {
                  return new Promise((resolve) => {
                    history.push('/calendar');
                    Promise.resolve(response.json()).then((value) => {
                      console.log(value);
                    });
                    resolve();
                  });
                },
              });
            } else {
              Modal.warn({
                title: response.statusText,
                content: 'Cannot add task. Please try again later. ',
              });
            }
          });
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
              mode="combobox"
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

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const CreateTaskForm = Form.create()(CreateTask);

export default CreateTaskForm;
