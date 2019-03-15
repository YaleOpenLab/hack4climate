import React from "react";
import MessageComponent from "./MessageComponent";

import * as words from "./Words";
// Import formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitButton from './SubmitButton';

import FormSectionNames from './FormSectionNames';

const FormSection1 = props => {
  const { sectionOne, sectionTwo } = FormSectionNames
  const { me, you, its, your, they, them, their } = words;
  const {pledgeType} = props;
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
          props.nextFormSection(sectionTwo.slug, values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, isSubmitting }) => {
        const createExamplePledge = () => {
          values.description = "to eat meat no more than five times a week";
        };

        const someoneAtTheOrgs = `the person responsible at ${values.name}'s`;
        return (
          <Form>
            <div className="PledgeCreate-pledgeSection">
              <div className="PledgeCreate-pledgeSection--title">
                <h2>{sectionOne.name}</h2>
              </div>
              <div className="PledgeCreate-pledgeSection--inputs">
                <label htmlFor="name">
                  What is{" "}
                  {pledgeType === "me"
                    ? your
                    : pledgeType === "my-org" || pledgeType === "other-org"
                    ? its
                    : their}{" "}
                  name?
                </label>

                <div className="uk-block">
                  <Field
                    className="uk-input"
                    name="name"
                    type="text"
                    placeholder="e.g. Wadham College"
                    value={values.name}
                  />
                  {/* </div> */}
                </div>
                <label htmlFor="description">
                  What action is going to be taken? Pledges should start with
                  the word "to":
                </label>

                <Field
                  className="uk-textarea"
                  name="description"
                  component="textarea"
                  placeholder={`This pledge commits ${
                    pledgeType === "me" ? me : them
                  }...`}
                  value={values.description}
                />
              </div>
              <div className="PledgeCreate-pledgeSection--errors">
                <ErrorMessage name="description" component={MessageComponent} />
                <ErrorMessage name="name" component={MessageComponent} />
              </div>
              <SubmitButton disabled={isSubmitting} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FormSection1;
