import { useContext, useState, useEffect } from "react";
import BookList from "../BookList";
import Loading from "../Loading";
import { Context } from "../../App";
import { TBook } from "../../App";

const Home = () => {
  const { books, isLoading } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };
    fetchData();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
  };

  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books?.filter(
          (book: TBook) =>
            book.subjects.includes(selectedGenre) ||
            book.bookshelves.includes(selectedGenre)
        ) || [];

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
      <div className="filter-section mb-4 lg:mx-14 flex justify-end mt-4">
        <select
          className="p-2 rounded-xl transition duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-blue-500 hover:ring-2 hover:ring-blue-300"
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

      {/* Book List */}
      <div className="lg:bg-white lg:px-6 rounded-xl lg:mx-14 border grid md:grid-cols-3 grid-cols-2 lg:grid-cols-5 gap-1 lg:gap-3 animate-fade-in">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          records.map((book: TBook) => (
            <div className="opacity-0 animate-fade-in-up" key={book.id}>
              <BookList book={book} />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && (
        <nav className="border p-2 mb-10 mt-8">
          <ul className="flex justify-center space-x-2">
            <li>
              <button
                onClick={prePage}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
              >
                Prev
              </button>
            </li>
            {numbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => changeCPage(number)}
                  className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={nextPage}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Home;
