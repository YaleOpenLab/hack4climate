import React from "react";
import MessageComponent from "./MessageComponent";

import * as words from "./Words";
// Import formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitButton from './SubmitButton';

import FormSectionNames from './FormSectionNames';

const FormSection2 = props => {
  const { sectionTwo, sectionThree } = FormSectionNames
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
          props.nextFormSection(sectionThree.slug, values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, isSubmitting }) => {
        // const createExamplePledge = () => {
        //   values.description = "to eat meat no more than five times a week";
        // };

        // const someoneAtTheOrgs = `the person responsible at ${values.name}'s`;
        return (
          <Form>
            <div className="PledgeCreate-pledgeSection">
              <div className="PledgeCreate-pledgeSection--title">
              <h2>{sectionTwo.name}</h2>
              </div>
              <div className="PledgeCreate-pledgeSection--inputs">
                <label htmlFor="evidenceDescription">
                  What evidence will{" "}
                  {values.name ? values.name : pledgeType === "me" ? you : they}{" "}
                  need to provide for this pledge to be fulfilled?
                </label>

                <Field
                  className="uk-input"
                  name="evidenceDescription"
                  type="text"
                  placeholder="e.g. photos, documents, energy readings"
                  value={values.evidenceDescription}
                />

                <label htmlFor="impact">
                  What impact is this pledge going to have on the environment?
                </label>

                <Field
                  className="uk-input"
                  name="impact"
                  placeholder="Overall reduction in C02 if target is met"
                  value={values.impact}
                />
              </div>

              <div className="PledgeCreate-pledgeSection--errors">
                <ErrorMessage
                  name="evidenceDescription"
                  component={MessageComponent}
                />
                <ErrorMessage name="impact" component={MessageComponent} />
              </div>
              <SubmitButton disabled={isSubmitting} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FormSection2;
