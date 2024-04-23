import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

import { deleteContact } from "../../redux/contactsOps";

import css from "./Contact.module.css";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      <ul>
        <li className={css.contact}>
          <IoPersonSharp />
          <p>{name}</p>
        </li>
        <li className={css.contact}>
          <FaPhoneAlt />
          <p>{number}</p>
        </li>
      </ul>
      <button
        onClick={() => onDeleteContact(id)}
        className={css.contactBtn}
        type="button"
      >
        Delete
      </button>
    </>
  );
};

export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
