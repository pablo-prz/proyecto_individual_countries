import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1 className="welcomeText">Welcome, come in and explore your world!</h1>
      <Link to="/home">
        <button>entry</button>
      </Link>
    </div>
  );
};

export default Landing;
