/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={style.container}>
      <h1>{props.name}</h1>
      <Link to={`/home/${props.id}`}>
        <img src={props.flag} />
      </Link>
      <h2>{props.continent}</h2>
    </div>
  );
};

export default Card;
