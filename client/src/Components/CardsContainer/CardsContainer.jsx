import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const countries = useSelector((state) => state.countries);
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
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          style={{ fontWeight: "bold" }}
        >
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div>
      {currentItems.map((el) => (
        <Card
          key={el.id}
          id={el.id}
          name={el.name}
          flag={el.flag}
          continent={el.continent}
        />
      ))}
      <div>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Prev
          </button>
        )}
        {renderPageNumbers}
        {currentPage < pageNumbers.length && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;
