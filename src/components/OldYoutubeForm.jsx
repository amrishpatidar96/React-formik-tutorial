import React from "react";
import classNames from "./youtubeForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

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
});

const onSubmit = (values) => {
  console.log("values", values);
};
const initialValues = {
  name: "",
  channel: "",
  email: "",
};
function YoutubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  });

  console.log(formik.errors);

  return (
    <div className={classNames.formcontainer}>
      <form onSubmit={formik.handleSubmit} className={classNames.form}>
        <div className={classNames.formcontrol}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.errors.name && formik.touched.name ? (
            <span className={classNames.error}>{formik.errors.name}</span>
          ) : null}
        </div>
        <div className={classNames.formcontrol}>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.errors.email && formik.touched.email ? (
            <span className={classNames.error}>{formik.errors.email}</span>
          ) : null}
        </div>

        <div className={classNames.formcontrol}>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            placeholder="Channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.errors.channel && formik.touched.channel ? (
            <span className={classNames.error}>{formik.errors.channel}</span>
          ) : null}
        </div>
        <div className={classNames.formcontrol}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default YoutubeForm;
