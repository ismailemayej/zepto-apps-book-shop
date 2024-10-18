import { useEffect, useState } from "react";

// Define the Book type
export type Book = {
  id: number;
  title: string;
  formats: { [key: string]: string };
  authors: { name: string }[];
  subjects: string[];
  bookshelves: string[];
  download_count: number;
};

const WishList = () => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  useEffect(() => {
    const items = getAllWishlistItems();
    setWishlist(items);

    const handleStorageChange = () => {
      const updatedItems = getAllWishlistItems();
      setWishlist(updatedItems);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getAllWishlistItems = (): Book[] => {
    const wishlistItems: Book[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("wished-")) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            wishlistItems.push(JSON.parse(item));
          } catch (error) {
            console.error("Failed to parse item from localStorage:", error);
          }
        }
      }
    }
    return wishlistItems;
  };

  const removeItem = (id: number) => {
    localStorage.removeItem(`wished-${id}`);

    // Update the wishlist state immediately after removing from localStorage
    setWishlist((prevWishlist) =>
      prevWishlist.filter((book) => book.id !== id)
    );
  };

  return (
    <div>
      <h1 className="font-bold text-xl border-b-4 px-1">Wish List</h1>
      {wishlist.length > 0 ? (
        <ul className="px-1">
          {wishlist.map((book) => (
            <li
              className="border-b my-2 px-2 flex gap-2 justify-between"
              key={book.id}
            >
              <h1 className="hover:bg-orange-200">{book.title}</h1>
              <button onClick={() => removeItem(book.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon-remove text-gray-700 hover:text-red-500 transition-colors duration-300 cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18M4 6l1 15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-15M10 11v6M14 11v6" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books in the wish list</p>
      )}
    </div>
  );
};

export default WishList;
