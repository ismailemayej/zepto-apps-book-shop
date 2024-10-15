import { createContext, useState, useEffect } from "react";
export const Context = createContext<any[]>([]);
const [books, setBooks] = useState();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://gutendex.com/books`);
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
}, []);

const DataContext = ({ children }: { children: React.ReactNode }) => {
  return <Context.Provider value={books || []}>{children}</Context.Provider>;
};

export default DataContext;
