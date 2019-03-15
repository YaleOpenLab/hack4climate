import React from "react";
import MessageComponent from "./MessageComponent";
import SearchPledges from "../../pledge-actions/search-pledges/SearchPledges";
import * as words from "./Words";
// Import formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitButton from "./SubmitButton";

import FormSectionNames from "./FormSectionNames";

const FormSection4 = props => {
  const { sectionFour, sectionFive } = FormSectionNames;
  const { me, you, its, your, they, them, their } = words;
  const { pledgeType, currentPledge, setCurrentPledge } = props;

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
          props.nextFormSection(sectionFive.slug, values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, isSubmitting }) => {
        // const createExamplePledge = () => {
        //   values.description = "to eat meat no more than five times a week";
        // };

        //const someoneAtTheOrgs = `the person responsible at ${values.name}'s`;
        return (
          <Form>
            <div className="PledgeCreate-pledgeSection">
              <div className="PledgeCreate-pledgeSection--title">
                <h2>{sectionFour.name}</h2>
              </div>
              <div className="PledgeCreate-pledgeSection--inputs">
                <label htmlFor="pledgeParent">
                  Is this pledge related to another pledge? Is there a Climate
                  Change Committment that's been made by a company, institution
                  or city that this pledge is part of?
                </label>
                <SearchPledges
                  handleParentPledge={pledge => {

                    props.nextFormSection(sectionFive.slug, {
                      parentPledge: pledge.pledgeId
                        ? pledge.pledgeId
                        : pledge.name
                    });
                  }}
                />
                Parent pledge: {currentPledge.parentPledge}
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
export default FormSection4;
