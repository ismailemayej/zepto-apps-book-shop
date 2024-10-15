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
  // data fetching use UseContext
  const books = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 px-7 py-2 shadow-lg bg-white rounded-lg">
        {/* data mapping */}
        {books ? (
          books?.map((book) => <BookList key={book.id} book={book} />)
        ) : (
          <Loading />
        )}

        {/* pagination */}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
        >
          Previous
        </button>
        <span className="mx-2 text-lg font-bold">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
