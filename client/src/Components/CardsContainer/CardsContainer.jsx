import { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const countries = useSelector((state) => {
    return state.searchResult.length > 0 ? state.searchResult : state.countries;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countries.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number === currentPage) {
      return (
        <button key={number} onClick={() => handlePageChange(number)}>
          {number}
        </button>
      );
    } else if (number >= currentPage - 2 && number <= currentPage + 2) {
      return (
        <button key={number} onClick={() => handlePageChange(number)}>
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={style.container}>
      {currentItems.map((el) => (
        <Card
          key={el.id}
          id={el.id}
          name={el.name}
          flag={el.flag}
          continent={el.continent}
        />
      ))}
      <div className={style.buttons}>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>⬅</button>
        )}

        {renderPageNumbers}

        {currentPage < pageNumbers.length && (
          <button onClick={() => handlePageChange(currentPage + 1)}>➡</button>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;
