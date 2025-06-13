import React from "react";
import { Descriptions, Button } from "antd";

const Preview = ({ formData, onPrevious, onSubmit }) => {
  return (
    <>
      <Descriptions title="Preview Details" bordered column={1}>
        <Descriptions.Item label="First Name">
          {formData.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {formData.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Bank Name">
          {formData.bankName}
        </Descriptions.Item>
        <Descriptions.Item label="IFSC Code">
          {formData.ifscCode}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: 16 }}>
        <Button onClick={onPrevious} style={{ marginRight: 8 }}>
          Previous
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Preview;
