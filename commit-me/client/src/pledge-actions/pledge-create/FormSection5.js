import React from "react";
import MessageComponent from "./MessageComponent";

import * as words from "./Words";
// Import formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitButton from "./SubmitButton";

import FormSectionNames from "./FormSectionNames";

const FormSection5 = props => {
  const { sectionFive } = FormSectionNames;
  const { me, you, its, your, they, them, their } = words;
  const { pledgeType } = props;
  return (
    <Formik
      initialValues={props.currentPledge}
      enableReinitialize={true}
      validate={values => {
        let errors = {};
        if (!values.name) {
          errors.name = "Please add the institution";
        }

        if (!values.description) {
          errors.description = "A description of this pledge is required";
        }

        if (!errors.name && !errors.description) {
          //setFormSection('measurable')
          //smartDispatch({ isComplete: "assignable" });
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.nextFormSection('finalise', values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, isSubmitting }) => {
        // const createExamplePledge = () => {
        //   values.description = "to eat meat no more than five times a week";
        // };

        const someoneAtTheOrgs = `the person responsible at ${values.name}'s`;
        return (
          <Form>
            <div className="PledgeCreate-pledgeSection">
              <div className="PledgeCreate-pledgeSection--title">
                <h2>{sectionFive.name}</h2>
              </div>
              <div className="PledgeCreate-pledgeSection--inputs">
                <label htmlFor="deadline">Pledge deadline</label>

                <Field
                  className="uk-input"
                  name="deadline"
                  type="text"
                  placeholder="The deadline of your pledge"
                  value={values.deadline}
                />
              </div>
              <div className="PledgeCreate-pledgeSection--errors">
                <ErrorMessage name="deadline" component={MessageComponent} />
              </div>

              <SubmitButton disabled={isSubmitting} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FormSection5;
