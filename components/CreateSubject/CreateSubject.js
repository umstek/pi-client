import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class CreateSubject extends Component {
  static propTypes = {
    form: PropTypes.objectOf(Form).isRequired,
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
        <FormItem {...formItemLayout} label="Difficulty">
          {getFieldDecorator('difficulty', {
            rules: [{ required: true, message: 'Difficulty is required. ' }],
            initialValue: 1,
          })(
            <InputNumber min={1} max={10} />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Weight">
          {getFieldDecorator('weight', {
            rules: [{ required: true, message: 'Weight is required. ' }],
            initialValue: 1,
          })(
            <InputNumber min={1} max={10} step={0.5} />,
          )}
        </FormItem>
      </Form>
    );
  }
}

const CreateSubjectForm = Form.create()(CreateSubject);

export default CreateSubjectForm;
