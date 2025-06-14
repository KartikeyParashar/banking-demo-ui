/**
 * 🏦 BankDetails Component
 *
 * 📋 Purpose:
 * Collects user's bank-related information: Bank Name & IFSC Code.
 * Used as a step in a multi-step form (like Stepper).
 *
 * 💡 Props:
 * @param {Object} formData - Current user input from previous steps
 * @param {Function} setFormData - Setter to update main form state
 * @param {Function} onNext - Function to proceed to next form step
 * @param {Function} onPrevious - Function to return to previous step
 */

import React from "react";
import { Form, Input, Button, message } from "antd";

const BankDetails = ({ formData, setFormData, onNext, onPrevious }) => {
  const [form] = Form.useForm(); // 📝 Create form instance

  /**
   * ✅ Handles form submission and moves to next step
   */
  const onFinish = (values) => {
    try {
      setFormData({ ...formData, ...values });
      onNext();
    } catch (error) {
      console.error("❌ Error updating form data:", error);
      message.error("Something went wrong while saving bank details.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={formData}
    >
      {/* 🏦 Bank Name Field */}
      <Form.Item
        label="🏦 Bank Name"
        name="bankName"
        rules={[{ required: true, message: "Please enter your bank name" }]}
      >
        <Input placeholder="Enter your bank name" />
      </Form.Item>

      {/* 🔢 IFSC Code Field */}
      <Form.Item
        label="🔢 IFSC Code"
        name="ifscCode"
        rules={[{ required: true, message: "Please enter IFSC code" }]}
      >
        <Input placeholder="Enter IFSC code (e.g., SBIN0001234)" />
      </Form.Item>

      {/* 🔘 Navigation Buttons */}
      <Form.Item>
        <Button onClick={onPrevious} style={{ marginRight: 8 }}>
          ⬅️ Previous
        </Button>
        <Button type="primary" htmlType="submit">
          ➡️ Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BankDetails;