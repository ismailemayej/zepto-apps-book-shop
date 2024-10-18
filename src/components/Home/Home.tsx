import { useContext, useState } from "react";
import BookList from "../BookList";
import Loading from "../Loading";
import { Context } from "../../App";

export type Book = {
  id: number;
  title: string;
  formats: { [key: string]: string };
  authors: { name: string }[];
  subjects: string[];
  bookshelves: string[];
  download_count: number;
};

const Home = () => {
  const books = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  // Pagination logic
  const LIndex = currentPage * postPerPage;
  const FIndex = LIndex - postPerPage;
  const records = books.slice(FIndex, LIndex);
  const npage = Math.ceil(books.length / postPerPage);
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCPage = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <div className="home">
        {/* Data Mapping */}
        {books ? (
          records.map((book) => <BookList key={book.id} book={book} />)
        ) : (
          <Loading />
        )}
      </div>

      {/* Pagination */}
      <nav className="border p-1">
        <ul className="custom-flex-container">
          {/* Previous Page Button */}
          <li className="row-item">
            <a href="#" onClick={prePage}>
              Prev
            </a>
          </li>

          {/* Page Number Buttons */}
          {numbers.map((number) => (
            <li
              className={`custom-item ${
                currentPage === number
                  ? "bg-blue-500 text-white rounded-lg px-4"
                  : ""
              }`}
              onClick={() => changeCPage(number)}
              key={number}
            >
              {number}
            </li>
          ))}

          {/* Next Page Button */}
          <li className="custom-row-item">
            <a href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
