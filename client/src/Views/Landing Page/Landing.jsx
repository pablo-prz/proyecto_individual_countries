import { Link } from "react-router-dom";
import style from "./Landing.module.css";
const Landing = () => {
  return (
    <div className={style.landing}>
      <h1>Welcome, come in, and explore your world!</h1>
      <Link to="/home">
        <button>entry</button>
      </Link>
    </div>
  );
};

export default Landing;
