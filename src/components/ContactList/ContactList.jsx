import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";

import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = () => {
  const filterContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactsContainer}>
      {filterContacts.length === 0 && <li>No contacts</li>}
      {filterContacts.map((contact) => {
        return (
          <li key={contact.id} className={css.contactBox}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
