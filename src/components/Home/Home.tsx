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
  // data fetching use UseContext---------------------------------
  const books = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  // pagination------------------------------------
  const LIndex = currentPage * postPerPage;
  const FIndex = LIndex - postPerPage;
  const records = books.slice(FIndex, LIndex);
  const npage = Math.ceil(books.length / postPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const prePage = () => {
    if (currentPage !== FIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const changeCPage = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 px-7 py-2 shadow-lg bg-white rounded-lg">
        {/* data mapping */}
        {books ? (
          records.map((book) => <BookList key={book.id} book={book} />)
        ) : (
          <Loading />
        )}
        {/* pagination */}
      </div>
      <nav className="border p-1">
        <ul className="flex justify-center items-center text-center border">
          {/* prev page button */}
          <li className="border-r p-1.5 text-center hover:bg-slate-300 hover:border hover: rounded-lg bg-blue-500 text-white px-6 hover:text-black">
            <a href="#" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((number) => (
            <li
              className={`border-r p-1.5 transition-all will-change-scroll items-center hover:bg-blue-500 hover:text-white px-4 rounded-lg ${
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
          {/* next page button */}
          <li className="border-r p-1.5 text-center hover:bg-slate-300 hover:border hover: rounded-lg bg-blue-500 text-white px-6 hover:text-black">
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
