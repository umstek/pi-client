import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, InputNumber, Modal, Button } from 'antd';

const FormItem = Form.Item;

const CreateSubjectForm = Form.create()((props) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const { visible, loading, onCancel, onOk, form } = props;
  const { getFieldDecorator } = form;

  return (
    <Modal
      visible={visible}
      title="Create a subject"
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" size="large" onClick={onCancel}>Cancel</Button>,
        <Button
          key="submit" type="primary" size="large" loading={loading}
          onClick={onOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Form>
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
    </Modal>
  );
});

export default CreateSubjectForm;
