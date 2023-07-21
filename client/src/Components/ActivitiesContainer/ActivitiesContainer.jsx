/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ActivitiesContainer.module.css";

const ActivitiesContainer = ({ activities }) => {
  const [expandedCountries, setExpandedCountries] = useState([]);

  const handleExpandCountries = (index) => {
    if (expandedCountries.includes(index)) {
      setExpandedCountries(expandedCountries.filter((i) => i !== index));
    } else {
      setExpandedCountries([...expandedCountries, index]);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <Link to={"/home"}>
          <button>Home</button>
        </Link>
        <h1>Activities</h1>
      </div>
      {activities.length === 0 ? (
        <div className={style.noActs}>
          <h1>No activities have been created yet.</h1>
          <Link to="/form">
            <button>Form✎</button>
          </Link>
        </div>
      ) : (
        <div className={style.cards}>
          {activities.map((activity, index) => (
            <div key={index}>
              <h2>{activity.name}</h2>
              <ul>
                <li>Difficulty: {activity.difficulty}</li>
                <li>Duration: {activity.duration} Hrs</li>
                <li>Season: {activity.season}</li>
                <li className={style.countriesList}>
                  Countries:
                  <button onClick={() => handleExpandCountries(index)}>
                    {expandedCountries.includes(index) ? "▼" : "►"}
                  </button>
                  {expandedCountries.includes(index) && (
                    <ul>
                      {activity.Countries.map((country, countryIndex) => (
                        <li key={countryIndex}>{country.name}</li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesContainer;
