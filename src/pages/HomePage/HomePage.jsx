import { TiContacts } from "react-icons/ti";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./HomePage.module.css";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.homeContainer}>
      <h1 className={css.title}>
        <TiContacts />
        Contact manager
      </h1>

      {!isLoggedIn && (
        <div>
          <p className={css.text}>
            To start using this manager, you need to{" "}
            <Link className={css.link} to="/register">
              register
            </Link>{" "}
            on the service.
          </p>
          <p>
            If you already registered, you need to{" "}
            <Link className={css.link} to="/login">
              log in
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
