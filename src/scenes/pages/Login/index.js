import React from 'react';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot">Forgot password</a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="register">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
