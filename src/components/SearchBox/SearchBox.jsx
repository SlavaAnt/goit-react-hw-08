import { useSelector, useDispatch } from "react-redux";

import { selectNameFilter } from "../../redux/filters/selectors";

import { changeFilter } from "../../redux/filters/slice";

import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);

  const handleOnChange = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };

  return (
    <label className={css.searchBox}>
      <span className={css.searchBoxInputName}>
        Find contacts by name or number
      </span>
      <input
        className={css.searchBoxInput}
        type="text"
        placeholder="Search"
        value={filterValue}
        onChange={handleOnChange}
      />
    </label>
  );
};

export default SearchBox;
