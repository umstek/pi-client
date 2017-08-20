import React from 'react';
import { Button, Checkbox, Form, Icon, Input, Tooltip, Select } from 'antd';
import { Link } from 'react-router-dom';

import './signUp.css';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkAgreement = (rule, value, callback) => {
    if (value === true) {
      callback();
    } else {
      callback('Accept the agreement. ');
    }
  };

  checkUsername = (rule, value, callback) => {
    // const form = this.props.form;
    if (!value) {
      callback();
    } else if (/^[^a-z]$/.test(value.substring(0, 1))) {
      callback('Username must start with a lowercase letter. ');
    } else if (value.length < 3) {
      callback('Username must be at least 3 characters. ');
    } else if (!/^[a-z][a-z0-9_]*$/.test(value)) {
      callback(
        "Username contains invalid characters. Use a-z, 0-9, and '_' only. "
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },

      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };

    return (
      <Form className="sign-up-form">
        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.checkConfirm
              }
            ]
          })(<Input type="password" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.checkPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                validator: this.checkUsername
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            rules: [
              {
                required: true,
                message: 'Please accept the agreement. '
              },
              {
                validator: this.checkAgreement
              }
            ],
            valuePropName: 'checked',
            initialValue: false
          })(
            <Checkbox>
              I have read the <Link to="/help/about/eula">agreement</Link>
            </Checkbox>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              User type &nbsp;
              <Tooltip title="Are you a student? or an expert?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('userType', { initialValue: 'Student' })(
            <Select>
              <Option key="student">Student</Option>
              <Option key="author">Content Author</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button
            className="sign-up-form-button"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Register
          </Button>,
        </FormItem>
      </Form>
    );
  }
}

const SignupForm = Form.create()(RegistrationForm);

export default SignupForm;
