import React, { PropTypes } from 'react';
import { config } from 'react-loopback';
import { Button, Checkbox, Form, Icon, Input, Modal } from 'antd';

import Link from '../Link';
import history from '../../src/history';

const FormItem = Form.Item;
const loginFormStyle = { maxWidth: 300 };
const loginFormForgotStyle = { float: 'right' };
const loginFormButtonStyle = { width: '100%' };

class NormalLoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.objectOf(Form).isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('http://localhost:4000/api/SystemUsers/login',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
          })
          .then((response) => {
            console.log('Received values of form: ', response);
            if (response.ok) {
              Modal.success({
                title: 'Success',
                content: 'Logged-in successfully. ',
                onOk() {
                  // Closing of modal is handled by immediately resolving a promise.
                  return new Promise((resolve) => {
                    history.push('/'); // redirect
                    Promise.resolve(response.json()).then((value) => {
                      // Store access token
                      config.set('access_token', value.id);
                    }, (value) => {
                      // not called
                    });
                    resolve();
                  });
                },
              });
            } else {
              Modal.warn({
                title: response.statusText,
                content: 'Cannot log-in. Please check your username and password. ',
              });
            }
          })
          .catch((error) => {
            Modal.error({
              title: 'Error',
              content: JSON.stringify(error),
            });
          });
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={loginFormStyle} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>,
          )}
          <a className="login-form-forgot" style={loginFormForgotStyle}>Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button" style={loginFormButtonStyle}>
            Log in
          </Button>
          Or <Link to="signup">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
