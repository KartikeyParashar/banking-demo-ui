import { useState } from "react";
import { Steps, message } from "antd";
import PersonalDetails from "./PersonalDetails";
import BankDetails from "./BankDetails";
import Preview from "./Preview";

const StepperFlow = ({ addNewUser }) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

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
            addNewUser(formData);
            message.success("User submitted successfully!");
            setCurrent(0);
            setFormData({});
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 24 }}>{steps[current].content}</div>
    </>
  );
};

export default StepperFlow;
