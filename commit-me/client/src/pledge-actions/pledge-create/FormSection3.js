import React from "react";
import MessageComponent from "./MessageComponent";

import * as words from "./Words";
// Import formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitButton from "./SubmitButton";

import FormSectionNames from "./FormSectionNames";

const FormSection2 = props => {
  const { sectionThree, sectionFour } = FormSectionNames;
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
          props.nextFormSection(sectionFour.slug, values);
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
                <h2>{sectionThree.name}</h2>
              </div>
              <div className="PledgeCreate-pledgeSection--inputs">
                <label htmlFor="creatorEmail">
                  What is your email address?
                </label>
                <Field
                  className="uk-input"
                  name="creatorEmail"
                  type="text"
                  placeholder=""
                  value={values.creatorEmail}
                />
                {pledgeType != "me" && pledgeType != "anyone"}
                {
                  <>
                    <label htmlFor="impact">
                      What is{" "}
                      {pledgeType === "friend" ? their : someoneAtTheOrgs} email
                      address?
                    </label>

                    <Field
                      className="uk-input"
                      name="subjectEmail"
                      placeholder="The email of the person who will ultimately take this pledge"
                      value={values.subjectEmail}
                    />
                  </>
                }
              </div>
              <div className="PledgeCreate-pledgeSection--errors">
                <ErrorMessage
                  name="creatorEmail"
                  component={MessageComponent}
                />
                <ErrorMessage name="subjectEmail" component={MessageComponent} />
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
