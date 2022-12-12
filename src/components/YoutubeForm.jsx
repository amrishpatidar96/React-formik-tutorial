import React from "react";
import classNames from "./youtubeForm.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { useState } from "react";

// const validate = (values) => {
//   let errors = {};
//   if (!values.name) {
//     errors.name = "required";
//   }
//   if (!values.email) {
//     errors.email = "required";
//   } else if (
//     !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
//   ) {
//     errors.email = "Invalid email format";
//   }
//   if (!values.channel) {
//     errors.channel = "required";
//   }
//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  channel: Yup.string().required("Channel is required"),
  // comments: Yup.string().required("Comments is required"),
  address: Yup.string().required("Address is required"),
});

const onSubmit = (values, onSubmitProps) => {
  console.log("values", values);
  setTimeout(() => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  }, 1000);
};
const initialValues = {
  name: "",
  channel: "",
  email: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  mobileNumber: ["", ""],
  phoneNumbers: [""],
};

const savedValues = {
  name: "amrish",
  channel: "infinitystudy",
  email: "amrish@gmail.com",
  comments: "this channes is good",
  address: "232 khd shajapur mp",
  social: {
    facebook: "facebook",
    twitter: "twitter",
  },
  mobileNumber: ["43215679", "43215479"],
  phoneNumbers: ["43215679", "43215659", "43213679"],
};

const validateComments = (value) => {
  return !value ? "This field is required" : null;
};

function YoutubeForm() {
  //console.log(formik.errors);

  const [formValues, setFormValues] = useState(null);

  console.log("savedValues", savedValues);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={true}
      // validateOnMount={true} this can be used when we have less field in form .
      // it runs validation when form mount into the dom.
    >
      {(formik) => {
        console.log("formik ", formik);
        return (
          <div className={classNames.formcontainer}>
            <Form className={classNames.form}>
              <div className={classNames.formcontrol}>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" placeholder="Name" />

                <ErrorMessage name="name">
                  {(errorMsg) => {
                    return <span className={classNames.error}>{errorMsg}</span>;
                  }}
                </ErrorMessage>
              </div>
              <div className={classNames.formcontrol}>
                <label htmlFor="email">E-mail</label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <span className={classNames.error}>
                  <ErrorMessage
                    name="email"
                    component={TextError}
                  ></ErrorMessage>
                </span>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="channel">Channel</label>
                <Field
                  type="text"
                  id="channel"
                  name="channel"
                  placeholder="Channel"
                />
                <span className={classNames.error}>
                  <ErrorMessage name="channel"></ErrorMessage>
                </span>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="comments">Comments</label>
                <Field
                  type="text"
                  id="comments"
                  name="comments"
                  placeholder="Comments"
                  as="textarea"
                  validate={validateComments}
                />
                <span className={classNames.error}>
                  <ErrorMessage name="comments"></ErrorMessage>
                </span>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="address">Address</label>
                <Field name="address">
                  {({ field, form, meta }) => {
                    console.log(meta);
                    return (
                      <>
                        <input type="text" {...field} />

                        {meta.touched && meta.error ? (
                          <span className={classNames.error}>{meta.error}</span>
                        ) : null}
                      </>
                    );
                  }}
                </Field>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="facebook">Facebook Profile</label>
                <Field name="social.facebook" type="text" id="facebook" />
                <span className={classNames.error}>
                  <ErrorMessage name="facebook"></ErrorMessage>
                </span>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="twitter">Twitter Profile</label>
                <Field name="social.twitter" type="text" id="twitter" />
                <span className={classNames.error}>
                  <ErrorMessage name="twitter"></ErrorMessage>
                </span>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="primaryMobileNumber">
                  Primary Mobile Number
                </label>
                <Field
                  name="mobileNumber[0]"
                  type="text"
                  id="primaryMobileNumber"
                />
                <span className={classNames.error}>
                  <ErrorMessage name="mobileNumber[0]"></ErrorMessage>
                </span>
              </div>

              <div className={classNames.formcontrol}>
                <label htmlFor="secondaryMobileNumber">
                  Secondary Mobile Number
                </label>
                <Field
                  name="mobileNumber[1]"
                  type="text"
                  id="secondaryMobileNumber"
                />
                <span className={classNames.error}>
                  <ErrorMessage name="mobileNumber[1]"></ErrorMessage>
                </span>
              </div>
              <dir className={classNames.formcontrol}>
                <label htmlFor="phoneNumbers">PhoneNumbers</label>
                <FieldArray name="phoneNumbers">
                  {(props) => {
                    console.log(props);
                    let { push, remove, form } = props;

                    return form.values.phoneNumbers.map((phNumber, i) => {
                      return (
                        <div key={i} style={{ position: "relative" }}>
                          <Field type="number" name={`phoneNumbers[${i}]`} />
                          <div className={classNames.rightabsolutebtn}>
                            <button
                              className={classNames.smallbtn}
                              onClick={() => push("")}
                            >
                              +
                            </button>
                            {i > 0 && (
                              <button
                                className={classNames.smallbtn}
                                onClick={() => remove(i)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    });
                  }}
                </FieldArray>
              </dir>

              <div className={classNames.formcontrol + " " + classNames.btn}>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </button>
              </div>

              <div className={classNames.formcontrol + " " + classNames.btn}>
                <button
                  type="reset"
                  onClick={() => {
                    const formval = JSON.parse(JSON.stringify(savedValues));
                    console.log("formval", formval);
                    setFormValues(formval);
                  }}
                >
                  Load Saved Data
                </button>
              </div>

              {/* <div className={classNames.formcontrol + " " + classNames.btn}>
                <button
                  type="button"
                  onClick={() => formik.validateField("comments")}
                >
                  Validate comments
                </button>
              </div>
              <div className={classNames.formcontrol + " " + classNames.btn}>
                <button type="button" onClick={() => formik.validateForm()}>
                  Validate all
                </button>
              </div>

              <div className={classNames.formcontrol + " " + classNames.btn}>
                <button
                  type="button"
                  onClick={() => formik.setFieldTouched("comments")}
                >
                  Validate Field comments
                </button>
              </div>
              <div className={classNames.formcontrol + " " + classNames.btn}>
                <button
                  type="button"
                  onClick={() =>
                    formik.setTouched({
                      name: true,
                      channel: true,
                      email: true,
                      comments: true,
                      address: true,
                    })
                  }
                >
                  Validate all Field
                </button>
              </div> */}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
