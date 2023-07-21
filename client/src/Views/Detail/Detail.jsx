import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../../Redux/Actions";
import { Link, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { NavLink } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countryDetail);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);
  return (
    <>
      <div className={style.container}>
        <div>
          <Link to="/home">
            <button>Home🌍</button>
          </Link>
          {countryDetail ? (
            <>
              <h1>{countryDetail.name}</h1>

              <img src={countryDetail.flag} alt={countryDetail.name} />
              <p>Area: {countryDetail.area}km²</p>
              <p>Subregion: {countryDetail.subregion}</p>
              <p>Capital: {countryDetail.capital}</p>
              <p>Continent: {countryDetail.continent}</p>
              <NavLink className={style.link}to={countryDetail.map}>GoogleMap</NavLink>
              <p>Population: {countryDetail.population}👥</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
