import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/selectors";

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && <ContactList />}
    </div>
  );
}

export default App;
