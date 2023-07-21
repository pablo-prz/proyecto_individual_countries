/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import {
  alphaOrder,
  popuOrder,
  continentOrder,
  getCountriesByName,
  cleanSearch,
  filterByActivity,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./NavBar.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm) {
      dispatch(getCountriesByName(searchTerm));
    } else {
      dispatch(cleanSearch());
    }
  };
  const handleActivity = (event) => {
    const activity = event.target.value;
    dispatch(filterByActivity(activity));
  };
  const handleContinent = (event) => {
    const continent = event.target.value;
    dispatch(continentOrder(continent));
  };
  const handlealpha = (event) => {
    const order = event.target.value;
    dispatch(alphaOrder(order));
  };
  const handlePopulation = (event) => {
    const order = event.target.value;
    dispatch(popuOrder(order));
  };
  return (
    <nav className={style.container}>
      <Link to="/form">
        <button>Form✎</button>
      </Link>
      <div>
        <input
          type="text"
          placeholder="search by name🔍"
          onChange={handleSearch}
        />
      </div>
      <div className={style.orders}>
        <select onChange={handlealpha}>
          <option value="none">Sort alphabetic</option>
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
        </select>
        <select onChange={handlePopulation}>
          <option value="none">Sort by population</option>
          <option value="population ⌄">population ⌄</option>
          <option value="population ⌃">population ⌃</option>
        </select>
      </div>

      <div>
        <select onChange={handleContinent}>
          <option value="All">All</option>
          <option value="South America">South America🌎</option>
          <option value="North America">North America🌎</option>
          <option value="Europe">Europe🌍</option>
          <option value="Africa">Africa🌍</option>
          <option value="Asia">Asia🌏</option>
          <option value="Oceania">Oceania🌏</option>
        </select>

        <select onChange={handleActivity}>
          <option>Filter by Activity</option>
          {activities.map((act) => (
            <option key={act.id} value={act.name}>
              {act.name}
            </option>
          ))}
        </select>
      </div>
      <Link to="/activities">
        <button>Activities</button>
      </Link>
    </nav>
  );
};
export default Nav;
