import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

const FormComponent = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    date: "",
    gender: "",
    vehicles: "",
  });
  return (
    <>
      <div>FormComponent</div>;
      <Form>
        <FormGroup>
          <Input type="text" placeholder="name" value={formFields?.name} />
        </FormGroup>

        <FormGroup>
          <Input />
        </FormGroup>

        <FormGroup>
          <Input />
        </FormGroup>

        <FormGroup>
          <Input />
        </FormGroup>

        <FormGroup>
          <Input />
        </FormGroup>
        <FormGroup>
          <Input />
        </FormGroup>
      </Form>
    </>
  );
};

export default FormComponent;
