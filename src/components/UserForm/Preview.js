/**
 * 👀 Preview Component
 *
 * 📋 Purpose:
 * Shows a summary of the user's input before submission.
 * Users can go back to edit or proceed to submit.
 *
 * 💡 Props:
 * - formData: 🧾 Object containing all user-entered data
 * - onPrevious: 🔙 Function to navigate to previous step
 * - onSubmit: ✅ Function to submit the form data
 */

import React from "react";
import { Descriptions, Button, message } from "antd";

const Preview = ({ formData, onPrevious, onSubmit }) => {
  // 🧠 Destructure values for clean usage
  const { firstName, lastName, bankName, ifscCode } = formData || {};

  // ✅ Submit Handler with Error Safety
  const handleSubmit = () => {
    try {
      onSubmit();
    } catch (error) {
      console.error("❌ Error during submission:", error);
      message.error("Something went wrong while submitting the form.");
    }
  };

  return (
    <>
      {/* 🧾 User Details Preview */}
      <Descriptions
        title="🧾 Preview Details"
        bordered
        column={1}
        labelStyle={{ fontWeight: "bold", width: "150px" }}
      >
        <Descriptions.Item label="👤 First Name">{firstName}</Descriptions.Item>
        <Descriptions.Item label="👨‍👩‍👧‍👦 Last Name">{lastName}</Descriptions.Item>
        <Descriptions.Item label="🏦 Bank Name">{bankName}</Descriptions.Item>
        <Descriptions.Item label="🔢 IFSC Code">{ifscCode}</Descriptions.Item>
      </Descriptions>

      {/* 🔘 Action Buttons */}
      <div style={{ marginTop: 16 }}>
        <Button onClick={onPrevious} style={{ marginRight: 8 }}>
          ⬅️ Previous
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          ✅ Submit
        </Button>
      </div>
    </>
  );
};

export default Preview;