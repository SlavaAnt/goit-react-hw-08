import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

const initialValues = { email: "", password: "" };
const loginFormSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
  password: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginFormSchema}
    >
      <Form className={css.form}>
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
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
