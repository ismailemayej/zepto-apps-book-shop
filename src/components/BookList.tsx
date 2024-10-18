import { useEffect, useState } from "react";
import { TBook } from "./Home/Home";

const BookList = ({ book }: { book: TBook }) => {
  const [isWished, setIsWished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check local storage for wish status
  useEffect(() => {
    const storedWish = localStorage.getItem(`wished-${book.id}`);
    setIsWished(!!storedWish); // Set isWished to true if item exists in local storage
  }, [book.id]);

  // Toggle wish status and update local storage
  const toggleWish = () => {
    setIsWished((prev) => {
      const newWishStatus = !prev;
      if (newWishStatus) {
        localStorage.setItem(`wished-${book.id}`, JSON.stringify(book));
      } else {
        localStorage.removeItem(`wished-${book.id}`);
      }
      return newWishStatus;
    });
  };

  // Check for errors in book data
  useEffect(() => {
    if (!book || !book.title || !book.authors || book.authors.length === 0) {
      setError("Book data is incomplete or missing.");
    } else {
      setError(null);
    }
  }, [book]);

  return (
    <div className="hover:bg-slate-50 flex items-center justify-between p-4 border-b border-gray-200 hover:shadow-xl rounded-xl transition-shadow duration-300 ease-in-out">
      {/* Error handling section */}
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : (
        <>
          {/* Book cover image section */}
          <div className="border mr-4 rounded-xl relative p-1">
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-48 border h-72 object-cover rounded-xl hover:rotate-6 transition-all duration-300 ease-in-out hover:scale-105"
            />
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-48 hover:border h-72 object-cover rounded-xl absolute top-0 left-0 hover:rotate-6 transition-all duration-300 ease-in-out hover:scale-105"
            />
          </div>
          {/* Book information in card */}
          <div className="relative flex-1 border h-[19rem] p-2 rounded-xl transition-opacity duration-300 ease-in-out">
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Author:</span>{" "}
              {book.authors
                ? book.authors.map((author: any) => author.name).join(", ")
                : "Unknown"}
            </p>
            <p className="text-sm text-gray-600 mb-2 line-clamp-5">
              <span className="font-semibold">Genre:</span>
              {book.subjects && book.subjects.length > 0
                ? book.subjects.join(", ")
                : "Unknown"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">Id:</span>
              {book.id}
            </p>
            <div className="flex gap-1 justify-between mt-auto absolute bottom-1">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                View
              </button>
              <button
                onClick={toggleWish}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ${
                  isWished ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isWished}
              >
                {isWished ? "Unwish" : "Wish"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
