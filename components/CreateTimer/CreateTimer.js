import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, InputNumber, Switch, Modal, Button } from 'antd';

import store from '../../src/store';
import env from '../../src/env.json';
import history from '../../src/history';

const FormItem = Form.Item;

class CreateTimer extends Component {
  static propTypes = {
    form: PropTypes.objectOf(Form).isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        fetch(`${env.baseUrl}/Timers?${store.getState().login.accessToken}`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
          })
          .then((response) => {
            if (response.ok) {
              Modal.success({
                title: 'Success',
                content: 'Timer added. ',
                onOk() {
                  return new Promise((resolve) => {
                    history.push('/syllabus');
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
                content: 'Cannot add timer. Please try again later. ',
              });
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name for the timer!' }],
          })(
            <Input prefix={<Icon type="clock-circle-o" style={{ fontSize: 13 }} />} placeholder="Name" />,
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('desc', {
            rules: [{ required: false, message: 'Please input some description!' }],
          })(
            <Input prefix={<Icon type="info" style={{ fontSize: 13 }} />} placeholder="Description" />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Duration">
          {getFieldDecorator('duration', { initialValue: 25 })(
            <InputNumber min={5} max={180} />,
          )}
          <span className="ant-form-text"> minutes</span>
        </FormItem>
        <FormItem {...formItemLayout} label="Work Timer">
          {getFieldDecorator('type', { valuePropName: 'checked', initialValue: true })(
            <Switch />,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const CreateTimerForm = Form.create()(CreateTimer);

export default CreateTimerForm;
