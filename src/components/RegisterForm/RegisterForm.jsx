import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import css from "./RegisterForm.module.css";

const registerFormInitialValues = { name: "", email: "", password: "" };
const maxCharMameValidation = 50;
const minCharMameValidation = 3;

const registerFormSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(
      minCharMameValidation,
      `Name must be longer, more than ${minCharMameValidation} characters!`
    )
    .max(
      maxCharMameValidation,
      `Name must be shorter, less than ${maxCharMameValidation} characters!`
    ),
  email: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
  password: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={registerFormInitialValues}
      onSubmit={handleSubmit}
      validationSchema={registerFormSchema}
    >
      <Form className={css.form}>
        <label className={css.formLabel}>
          <span className={css.formInputName}>Name</span>
          <Field
            className={css.formInput}
            type="text"
            name="name"
            placeholder="Enter name"
            required
          />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="p"
          />
        </label>
        <label className={css.formLabel}>
          <span className={css.formInputName}>Email</span>
          <Field
            className={css.formInput}
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="p"
          />
        </label>
        <label className={css.formLabel}>
          <span className={css.formInputName}>Password</span>
          <Field
            className={css.formInput}
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="p"
          />
        </label>
        <button className={css.formBtn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
