/* eslint-disable react-refresh/only-export-components */
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  alphaOrder,
  revAlphaOrder,
  popuOrder,
  revPopuOrder,
  continentOrder,
  getCountries,
  getActivities,
} from "../../Redux/Actions";
import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

const Nav = ({
  alphaOrder,
  revAlphaOrder,
  popuOrder,
  revPopuOrder,
  getCountries,
  continentOrder,
  getActivities,
}) => {
  const { pathname } = useLocation();
  const isFormOrDetail = pathname === "/form" || pathname.includes("/home/");
  const [order, setOrder] = useState("");
  const [continent, setContinent] = useState("");
  const [activity, setActivity] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (continent && continent !== "All") {
        await getCountries();
        dispatch(continentOrder(continent));
      } else {
        getCountries();
      }
    };
    fetchData();
  }, [continent, continentOrder, dispatch, getCountries]);

  useEffect(() => {
    if (order === "All") getCountries();
    else if (order === "a-z") alphaOrder();
    else if (order === "z-a") revAlphaOrder();
    else if (order === "population ⌄") revPopuOrder();
    else if (order === "population ⌃") popuOrder();
  }, [alphaOrder, getCountries, order, popuOrder, revAlphaOrder, revPopuOrder]);

  const actSearchHandler = (event) => {
    event.preventDefault();
    getCountries();
    setTimeout(() => {
      dispatch(getActivities(activity));
    }, 20);
    setActivity("");
  };

  const ActHandler = (event) => {
    event.preventDefault();
    setActivity(event.target.value);
  };

  return (
    <nav>
      {isFormOrDetail && (
        <Link to="/home">
          <button>Home🌍</button>
        </Link>
      )}

      {pathname === "/home" && (
        <>
          <Link to="/form">
            <button>Form✎</button>
          </Link>
          <SearchBar />
          <p>Sort↕️</p>
          <select onChange={(event) => setOrder(event.target.value)}>
            <option value="All">All</option>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="population ⌄">population ⌄</option>
            <option value="population ⌃">population ⌃</option>
          </select>
          <p>Filter</p>
          <select onChange={(event) => setContinent(event.target.value)}>
            <option value="All">All</option>
            <option value="South America">South America🌎</option>
            <option value="North America">North America🌎</option>
            <option value="Europe">Europe🌍</option>
            <option value="Africa">Africa🌍</option>
            <option value="Asia">Asia🌏</option>
            <option value="Oceania">Oceania🌏</option>
          </select>
          <p>Activity</p>
          <form>
            <input
              type="text"
              placeholder="Search activity"
              autoComplete="off"
              value={activity}
              onChange={ActHandler}
            />
            <button onClick={actSearchHandler}>Search</button>
          </form>
        </>
      )}
    </nav>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    alphaOrder: () => dispatch(alphaOrder()),
    revAlphaOrder: () => dispatch(revAlphaOrder()),
    popuOrder: () => dispatch(popuOrder()),
    revPopuOrder: () => dispatch(revPopuOrder()),
    continentOrder: (continent) => dispatch(continentOrder(continent)),
    getCountries: () => dispatch(getCountries()),
    getActivities: (payload) => dispatch(getActivities(payload)),
  };
};
const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};
// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
