/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ActCountry = (props) => {
  return (
    <div>
      <Link to={`/home/${props.id}`}>
        <img src={props.flag} />
      </Link>
      <p>{props.name}</p>
    </div>
  );
};
export default ActCountry;
