import { useEffect, useState } from "react";
import { createActivity, getCountriesByName } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import ActCountry from "../../Components/activitiesCountries/activitiesCountries";
const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [nameInput, setNameInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const filtCountries = countries.slice(currentPage, currentPage + 16);
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryID: [],
  });

  let nextPage = () => {
    if (countries.length <= currentPage + 16) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 16);
  };

  let prevPage = () => {
    if (currentPage - 9) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 16);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [countries]);

  useEffect(() => {
    dispatch(getCountriesByName(nameInput));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInput]);

  const resetState = () => {
    setFormData({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countryID: [],
    });
    setNameInput("");
  };

  const nameInputSubmit = (event) => {
    event.preventDefault();
    setNameInput(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    let form = true;
    if (formData["name"].length < 2) {
      form = false;
    } else if (!formData["countryID"].length >= 1) {
      form = false;
    }
    if (form) {
      console.log(formData);
      dispatch(createActivity(formData))
        .then(() => resetState())
        .then(() => alert("Activity created succefully!"));
    } else {
      return alert("Missing data");
    }
  };
  const formDataHandler = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const idHandler = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: formData[event.target.name].concat(
        event.target.value
      ),
    });
    alert("Country Added");
  };

  return (
    <div>
      <div>
        <form onSubmit={(event) => submitForm(event)}>
          <div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Name Activity"
              name="name"
              value={formData.name}
              onChange={formDataHandler}
            />
          </div>

          <div>
            <p>Difficulty</p>
            <select
              name="difficulty"
              value={formData.difficulty}
              id="difficulty"
              onChange={formDataHandler}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div>
            <p>Duration</p>
            <select
              name="duration"
              value={formData.duration}
              id="duration"
              onChange={formDataHandler}
            >
              <option value={1}>1hs</option>
              <option value={2}>2hs</option>
              <option value={3}>3hs</option>
              <option value={4}>4hs</option>
              <option value={5}>5hs</option>
              <option value={6}>6hs</option>
              <option value={7}>7hs</option>
              <option value={8}>8hs</option>
              <option value={9}>9hs</option>
              <option value={10}>10hs</option>
              <option value={11}>11hs</option>
              <option value={12}>12hs</option>
              <option value={13}>13hs</option>
              <option value={14}>14hs</option>
              <option value={15}>15hs</option>
              <option value={16}>16hs</option>
              <option value={17}>17hs</option>
              <option value={18}>18hs</option>
              <option value={19}>19hs</option>
              <option value={20}>20hs</option>
              <option value={21}>21hs</option>
              <option value={22}>22hs</option>
              <option value={23}>23hs</option>
              <option value={24}>24hs</option>
            </select>
          </div>

          <div>
            <p>Season</p>
            <select
              name="season"
              value={formData.season}
              id="season"
              onChange={formDataHandler}
            >
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Autumn">Autumn</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div>
            <p>Countrys</p>
            <input
              type="text"
              autoComplete="off"
              placeholder="Select a Country"
              onChange={nameInputSubmit}
            />
          </div>
          <div>
            <input type="submit" value="add activity" />
          </div>
        </form>
      </div>

      <button onClick={prevPage}> {"<"} </button>
      <button onClick={nextPage}> {">"} </button>
      <div>
        {filtCountries.map((el) => (
          <div key={el.id}>
            <ActCountry flag={el.flag} name={el.name} id={el.id} />
            <button onClick={idHandler} value={el.id} name="countryID">
              add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
