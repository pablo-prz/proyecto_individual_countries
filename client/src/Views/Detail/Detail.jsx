import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../../Redux/Actions";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countryDetail);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);
  console.log(countryDetail);
  return (
    <div>
      {countryDetail ? (
        <>
          <h1>{countryDetail.name}</h1>
          <img src={countryDetail.flag} alt={countryDetail.name} />
          <p>Area: {countryDetail.area}km²</p>
          <p>Subregion: {countryDetail.subregion}</p>
          <p>Capital: {countryDetail.capital}</p>
          <p>Continent: {countryDetail.continent}</p>
          <Link to={countryDetail.map}>GoogleMap</Link>
          <p>Population: {countryDetail.population}👥</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
