/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "./CreateActivities.module.css";
const CreateActivity = (props) => {
  const {
    countriesToShow,
    countriesPerPage,
    setPage,
    page,
    input,
    created,
    searchWord,
    messageError,
    handleChanges,
    handleCSelect,
    handleCDelete,
    handleSubmit,
    handleSearch,
    filtCountries,
  } = props;
  return (
    <div>
      <Link to="/home">
        <button className={style.btn}>Home🌍</button>
      </Link>
      <Link to="/activities">
        <button className={style.btn2}>Activities</button>
      </Link>
      <div className={style.form} onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          name="name"
          value={input.name}
          onChange={handleChanges}
        />
        {messageError.name && (
          <div className={style.errorM}> {messageError.name} </div>
        )}
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          value={input.difficulty}
          onChange={handleChanges}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="duration">Duration</label>
        <select name="duration" value={input.duration} onChange={handleChanges}>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <label htmlFor="season">Season</label>
        <select name="season" value={input.season} onChange={handleChanges}>
          <option value="Summer">Summer</option>
          <option value="Spring">Spring</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>
      </div>

      <div>
        <div className={style.countryAdd}>
          {input.CountryId.map((country, index) => (
            <span key={index}>
              ✔️{country}{" "}
              <button type="button" onClick={() => handleCDelete(index)}>
                X
              </button>
            </span>
          ))}
          {messageError.countries && <div> {messageError.countries} </div>}
        </div>
        <input
          className={style.input}
          type="text"
          onChange={handleSearch}
          value={searchWord}
          placeholder="Search countries"
        />
        <div className={style.cards}>
          {countriesToShow.map((country) => (
            <div key={country.id}>
              <img src={country.flag} />
              <h2>{country.name}</h2>
              <button type="button" onClick={() => handleCSelect(country)}>
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={style.pag}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous page
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filtCountries.length / countriesPerPage)}
        >
          Next page
        </button>
        {!messageError.name &&
          !messageError.countries &&
          !messageError.others &&
          !created && (
            <button type="submit" onClick={() => handleSubmit(event)}>
              Create
            </button>
          )}
        {messageError.others && !created && <span>{messageError.others}</span>}
        {messageError.others && (
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
        )}
        {created && (
          <span className={style.succesM}>¡Activity created successfully!</span>
        )}
        {created && (
          <button onClick={() => window.location.reload()}>¡Great!</button>
        )}
      </div>
    </div>
  );
};
export default CreateActivity;
