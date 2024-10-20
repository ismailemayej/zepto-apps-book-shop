import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect, createContext } from "react";

export type TBook = {
  id: number;
  title: string;
  formats: { [key: string]: string };
  authors: { name: string }[];
  subjects: string[];
  bookshelves: string[];
  download_count: number;
};

interface IContext {
  books: TBook[];
  isLoading: boolean;
}

export const Context = createContext<IContext>({ books: [], isLoading: true });

function App() {
  const [books, setBooks] = useState<TBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://gutendex.com/books");
        // const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooks(data.results);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const data = {
    books,
    isLoading,
  };

  return (
    <Context.Provider value={data}>
      <Navbar />
      <Outlet />
    </Context.Provider>
  );
}

export default App;
