import { useEffect, useState } from "react";
import BookList from "../BookList";
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
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Books Data by Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gutendex.com/books/?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBooks(data.results);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [currentPage]);

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
          <p>NO Data</p>
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
