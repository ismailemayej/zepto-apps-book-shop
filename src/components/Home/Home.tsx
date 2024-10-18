import { useContext, useState } from "react";
import BookList from "../BookList";
import Loading from "../Loading";
import { Context } from "../../App";

export type TBook = {
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
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  // Filter books by genre/topic
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1); // Reset to first page when genre is changed
  };

  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books.filter(
          (book) =>
            book.subjects.includes(selectedGenre) ||
            book.bookshelves.includes(selectedGenre)
        );

  // Pagination logic
  const LIndex = currentPage * postPerPage;
  const FIndex = LIndex - postPerPage;
  const records = filteredBooks.slice(FIndex, LIndex);
  const npage = Math.ceil(filteredBooks.length / postPerPage);
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
      {/* Dropdown Filter */}
      <div className="filter-section mb-1 mx-14 flex justify-end mt-4">
        <select
          className="p-2 rounded-xl transition duration-200 ease-in-out transform  focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="All">All</option>
          <option value="Science fiction">Science Fiction</option>
          <option value="Horror tales">Horror</option>
          <option value="Monsters -- Fiction">Monsters</option>
          <option value="Gothic fiction">Gothic Fiction</option>
          <option value="Scientists -- Fiction">Scientists</option>
          <option value="Frankenstein's monster (Fictitious character) -- Fiction">
            Frankenstein's Monster
          </option>
        </select>
      </div>

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
