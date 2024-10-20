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
    <div className="px-2 relative justify-center w-full flex-col items-center shadow-2xl border-gray-200 hover:bg-slate-200 hover:shadow-xl rounded-xl transition-all duration-500 ease-out">
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
              className="w-full px-2 h-72 pt-2 object-cover rounded-xl hover:rotate-6 transition-all duration-300 ease-in-out hover:scale-105"
            />
          </div>
          {/* Book information in card */}
          <div className="flex flex-col items-center w-full h-[10rem] px-2 my-3">
            <h2 className="lg:text-xl text-md font-bold line-clamp-2 mb-1">
              {book.title}
            </h2>

            <p className="text-md text-gray-600 mb-2">
              <span className="font-semibold">Author:</span>{" "}
              {book.authors
                ? book.authors.map((author: any) => author.name).join(", ")
                : "Unknown"}
            </p>

            <div className="grid grid-cols-2 absolute bottom-2 gap-2 justify-center mx-1.5">
              {/* Wish Button */}
              <button
                onClick={toggleWish}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 lg:px-4 rounded-lg flex items-center justify-center gap-2 ${
                  isWished ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isWished}
              >
                {/* Show heart icon on mobile */}
                <span className="lg:hidden">
                  {/* Heart SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.172 5.172a4.992 4.992 0 017.07 0l.708.707.707-.707a4.992 4.992 0 017.07 7.07L12 21.414 3.172 12.242a4.992 4.992 0 010-7.07z"
                    />
                  </svg>
                </span>
                {isWished ? (
                  <p className="lg:block hidden">Unwish</p>
                ) : (
                  <p className="lg:block hidden">Wish</p>
                )}
              </button>

              {/* Details Button */}
              <button
                onClick={openModal}
                className=" py-1.5 bg-blue-500 text-white w-full px-4 lg:px-10 rounded-lg"
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
