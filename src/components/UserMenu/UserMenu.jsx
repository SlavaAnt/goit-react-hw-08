import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const user = useSelector(selectUser);

  return (
    <div className={css.userMenuContainer}>
      <p>Welcome, {user.name}</p>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
