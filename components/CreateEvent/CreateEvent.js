import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Form, Icon, Input, Select, Spin } from 'antd';

import env from '../../src/env.json';
import store from '../../src/store';

const FormItem = Form.Item;
const Option = Select.Option;

class CreateEvent extends Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
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
      </Form>
    );
  }
}

const CreateEventForm = Form.create()(CreateEvent);

export default CreateEventForm;
