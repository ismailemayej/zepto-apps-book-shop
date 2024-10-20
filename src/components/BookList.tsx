import { useEffect, useState, useRef } from "react";
import Details from "./Details";
import { TBook } from "../App";

const BookList = ({ book }: { book: TBook }) => {
  const [isWished, setIsWished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [error, setError] = useState<string | null>(null);

  // Reference for modal content
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Check local storage for wish status
  useEffect(() => {
    const storedWish = localStorage.getItem(`wished-${book.id}`);
    setIsWished(!!storedWish);
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

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle click outside modal
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Attach event listener when modal is open
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Cleanup event listener when modal is closed
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="relative flex flex-col items-center shadow-2xl gap-6 border-gray-200 hover:bg-slate-200 hover:shadow-xl rounded-xl transition-all duration-500 ease-out py-3">
      {/* Error handling section */}
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : (
        <>
          {/* Book cover image section */}
          <div className="relative">
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="w-40 border h-60 pt-2 object-cover rounded-xl hover:rotate-6 transition-all duration-300 ease-in-out hover:scale-105"
            />
          </div>
          {/* Book information in card */}
          <div className="flex flex-col items-center w-48 h-[10rem] mb-3">
            <h2 className="text-xl font-bold text-center line-clamp-2 mb-1">
              {book.title}
            </h2>

            <p className="text-md text-gray-600 text-center mb-2">
              <span className="font-semibold">Author:</span>{" "}
              {book.authors
                ? book.authors.map((author: any) => author.name).join(", ")
                : "Unknown"}
            </p>

            <div className="flex gap-2 justify-center mt-auto">
              <button
                onClick={toggleWish}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ${
                  isWished ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isWished}
              >
                {isWished ? "Unwish" : "Wish"}
              </button>

              {/* Details Button */}
              <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              >
                Details
              </button>
            </div>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div
              ref={modalRef}
              className={`absolute top-0 left-0 h-80 overflow-scroll z-0 w-full bg-white p-2 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform ${
                isModalOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {isModalOpen && <Details book={book} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;
