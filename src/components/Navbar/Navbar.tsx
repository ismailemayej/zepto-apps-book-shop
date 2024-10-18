import { useContext, useState, useEffect } from "react";
import { Context } from "../../App";
import { Link } from "react-router-dom";
import WishList from "../WishList/WishList";
import { TBook } from "../Home/Home";
import BookList from "../BookList";

const Navbar = () => {
  const datas = useContext(Context) as TBook[]; // Ensure Context is typed correctly
  const [value, setValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [total, setTotal] = useState<number>(0);

  // Function to update total count of wishlist items
  const updateTotalCount = () => {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("wished-")) {
        count++;
      }
    }
    setTotal(count);
  };

  useEffect(() => {
    // Update the total count when the component mounts
    updateTotalCount();
    window.addEventListener("storage", updateTotalCount);
    return () => {
      window.removeEventListener("storage", updateTotalCount);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can add any additional logic here if needed
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="flex justify-between items-center shadow-xl lg:mx-14 px-7 lg:py-3 py-1 rounded-md border">
        {/* Site Logo */}
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="flex gap-3 items-center mr-1">
          {/* Wishlist Icon */}
          <div className="relative inline-block">
            <svg
              onClick={toggleMenu}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-wishlist text-gray-700 hover:text-blue-500 transition-colors duration-300 cursor-pointer"
              width="24"
              height="24"
            >
              <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
            </svg>
            <span className="bg-red-500 rounded-full text-xs text-white p-1 absolute -top-2 -right-2 font-bold">
              {total}
            </span>

            {/* Wishlist Menu */}
            <div>
              {isMenuOpen && (
                <div className=" px-4 absolute w-72 right-0 bg-white shadow-lg rounded-md mt-2 z-10 transition-transform duration-300 ease-in-out transform opacity-100 scale-100">
                  <WishList />
                </div>
              )}
              {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-transparent cursor-default"
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Search Box */}
          <form className="flex gap-1" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={value}
              onChange={handleInputChange}
              className="py-2 text-sm text-gray-700 w-full pr-3 pl-3 bg-slate-100 rounded-md"
            />
            <button
              className="bg-red-700 px-3 text-white py-1 rounded-lg hover:bg-red-400 hover:text-black"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </nav>

      {/* Filter and mapping for data show in UI */}
      {value &&
        datas
          .filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 7)
          .map((item) => (
            <div key={item.id}>
              <p className="mx-16 my-3 border-b py-2 px-4 hover:text-blue-500 bg-slate-50">
                {item?.title}
              </p>
            </div>
          ))}
      {value &&
        datas.filter((item) =>
          item?.title?.toLowerCase().includes(value.toLowerCase())
        ).length === 0 && (
          <div className="text-red-500 text-2xl text-center">
            No Search Data
          </div>
        )}

      {/* Display BookList based on filtered data */}
      {value && datas.length > 0 && (
        <div className="my-4">
          {datas
            .filter((item) =>
              item?.title?.toLowerCase().includes(value.toLowerCase())
            )
            .map((book) => (
              <BookList key={book.id} book={book} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
