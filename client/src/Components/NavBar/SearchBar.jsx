import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName, getCountries } from "../../Redux/Actions";
const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (Event) => {
    setInput(Event.target.value);
  };

  const onClickHandler = () => {
    dispatch(getCountriesByName(input));
  };

  const homeHandler = () => {
    dispatch(getCountries());
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search by name🔍"
        name="input"
        autoComplete="off"
        onChange={(Event) => inputHandler(Event)}
      />
      <div>
        <button onClick={() => onClickHandler()}>Search</button>
        <button onClick={() => homeHandler}>Reset</button>
      </div>
    </div>
  );
};

export default SearchBar;
