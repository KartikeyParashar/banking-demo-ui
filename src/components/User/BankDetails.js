import React from "react";
import { Form, Input, Button } from "antd";

const BankDetails = ({ formData, setFormData, onNext, onPrevious }) => {
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
        label="Bank Name"
        name="bankName"
        rules={[{ required: true, message: "Please enter your bank name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="IFSC Code"
        name="ifscCode"
        rules={[{ required: true, message: "Please enter IFSC code" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button onClick={onPrevious} style={{ marginRight: 8 }}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BankDetails;
