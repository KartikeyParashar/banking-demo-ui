/**
 * 👣 StepperFlow Component
 *
 * 🧩 Purpose:
 * Manages the step-based form flow for adding a new user.
 *
 * 🧾 Includes:
 * 1️⃣ Personal Details
 * 2️⃣ Bank Details
 * 3️⃣ Preview & Submit
 *
 * ✅ On submission, adds user and resets the form.
 */

import { useState } from "react";
import { Steps, message } from "antd";
import PersonalDetails from "./PersonalDetails";
import BankDetails from "./BankDetails";
import Preview from "./Preview";

const StepperFlow = ({ addNewUser }) => {
  // 🎯 Current step index
  const [current, setCurrent] = useState(0);

  // 📦 Form data accumulated across steps
  const [formData, setFormData] = useState({});

  // 👉 Proceed to next step
  const next = () => {
    try {
      setCurrent((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error moving to next step:", error);
      message.error("Something went wrong while going to the next step.");
    }
  };

  // 👈 Go back to previous step
  const prev = () => {
    try {
      setCurrent((prev) => prev - 1);
    } catch (error) {
      console.error("❌ Error moving to previous step:", error);
      message.error("Something went wrong while going back.");
    }
  };

  // 🧩 Steps configuration
  const steps = [
    {
      title: "Personal Details",
      content: (
        <PersonalDetails
          formData={formData}
          setFormData={setFormData}
          onNext={next}
        />
      ),
    },
    {
      title: "Bank Details",
      content: (
        <BankDetails
          formData={formData}
          setFormData={setFormData}
          onNext={next}
          onPrevious={prev}
        />
      ),
    },
    {
      title: "Preview & Submit",
      content: (
        <Preview
          formData={formData}
          onPrevious={prev}
          onSubmit={() => {
            try {
              addNewUser(formData); // ➕ Add user to global state
              message.success("🎉 User submitted successfully!");
              setCurrent(0); // 🔁 Reset to first step
              setFormData({}); // 🧹 Clear form
            } catch (error) {
              console.error("❌ Error submitting user:", error);
              message.error("Failed to submit user data.");
            }
          }}
        />
      ),
    },
  ];

  return (
    <>
      {/* 📶 Step Indicator */}
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>

      {/* 🎛️ Dynamic Step Content */}
      <div style={{ marginTop: 24 }}>
        {steps[current]?.content}
      </div>
    </>
  );
};

export default StepperFlow;