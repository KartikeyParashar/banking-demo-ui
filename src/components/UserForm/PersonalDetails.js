/**
 * 👤 PersonalDetails Component
 *
 * 📋 Purpose:
 * Collects user's personal information: First Name & Last Name.
 * Used as the first step in a multi-step form (e.g., Stepper Flow).
 *
 * 💡 Props:
 * @param {Object} formData - Current form state shared across steps
 * @param {Function} setFormData - Updates the shared form state
 * @param {Function} onNext - Callback to proceed to the next step
 */

import React from "react";
import { Form, Input, Button, message } from "antd";

const PersonalDetails = ({ formData, setFormData, onNext }) => {
  const [form] = Form.useForm(); // 📝 Form instance

  /**
   * ✅ Handles form submission and proceeds to the next step
   */
  const onFinish = (values) => {
    try {
      setFormData({ ...formData, ...values });
      onNext();
    } catch (error) {
      console.error("❌ Error while saving personal details:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={formData}
    >
      {/* 🧑 First Name */}
      <Form.Item
        label="🧑 First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input placeholder="Enter your first name" />
      </Form.Item>

      {/* 👤 Last Name */}
      <Form.Item
        label="👤 Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input placeholder="Enter your last name" />
      </Form.Item>

      {/* 🔘 Next Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          ➡️ Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalDetails;