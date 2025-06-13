import React from "react";
import { Form, Input, Button } from "antd";

const PersonalDetails = ({ formData, setFormData, onNext }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setFormData({ ...formData, ...values });
    onNext();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={formData}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalDetails;
