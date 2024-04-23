import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

import css from "./ContactForm.module.css";

const initialValues = { name: "", number: "" };

const contactFormSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
  number: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(50, "Too long"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactFormSchema}
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
          <span className={css.formInputName}>Number</span>
          <Field
            className={css.formInput}
            type="tel"
            name="number"
            placeholder="Enter phone number"
            required
          />
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="p"
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
