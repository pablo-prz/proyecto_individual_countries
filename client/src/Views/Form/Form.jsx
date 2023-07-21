/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { createActivity } from "../../Redux/Actions";
import { connect } from "react-redux";
import CreateActivity from "../../Components/CreateActivities/CreateActivities";
const Form = ({ createActivity, countries }) => {
  const [page, setPage] = useState(1);
  const countriesPerPage = 10;

  const [input, setInput] = useState({
    name: "",
    difficulty: 1,
    duration: 1,
    season: "Summer",
    CountryId: [],
  });
  const [created, setCreated] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [messageError, setMessageError] = useState({
    name: "*",
    countries: "*",
    others: "",
  });
  const handleChanges = (event) => {
    let value = event.target.value;
    if (event.target.name === "name") {
      if (!/^[a-zA-Z ]{4,20}$/.test(value)) {
        //verifica si el valor es una cadena de texto compuesta únicamente por letras (mayúsculas o minúsculas) y tiene una longitud de entre 4 y 15 caracteres.
        setMessageError({
          ...messageError,
          name: "The name must have between 4 and 20 characters, only letters.",
        });
      } else {
        setMessageError({
          ...messageError,
          name: "",
        });
      }
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    setInput({ ...input, [event.target.name]: value });
  };
  const handleCSelect = (country) => {
    if (!input.CountryId.includes(country.id)) {
      setInput({ ...input, CountryId: [...input.CountryId, country.id] });
    }
    if (input.CountryId.length >= 0) {
      setMessageError({ ...messageError, countries: "" });
    }
  };
  const handleCDelete = (index) => {
    setInput({
      ...input,
      CountryId: input.CountryId.filter((_, i) => i !== index),
    });
    if (input.CountryId.length > 1) {
      setMessageError({
        ...messageError,
        countries: "",
      });
    } else {
      setMessageError({
        ...messageError,
        countries: "At least one country must be selected",
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createActivity(input);
      setCreated(true);
      setMessageError({ ...messageError, others: "" });
    } catch (error) {
      setMessageError({ ...messageError, others: `${error}` });
    }
  };

  const handleSearch = (event) => {
    setSearchWord(event.target.value);
  };

  // eslint-disable-next-line react/prop-types
  const filtCountries = countries.filter((el) =>
    el.name.toLowerCase().includes(searchWord.toLowerCase())
  );
  const countriesToShow = filtCountries.slice(
    (page - 1) * countriesPerPage,
    page * countriesPerPage
  );
  return (
    <div>
      <CreateActivity
        countriesToShow={countriesToShow}
        countriesPerPage={countriesPerPage}
        setPage={setPage}
        page={page}
        input={input}
        created={created}
        searchWord={searchWord}
        messageError={messageError}
        handleChanges={handleChanges}
        handleCSelect={handleCSelect}
        handleCDelete={handleCDelete}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
        filtCountries={filtCountries}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createActivity: (activity) => dispatch(createActivity(activity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
