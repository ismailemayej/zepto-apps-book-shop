import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { createContext } from "react";
export const Context = createContext<any[]>([]);
function App() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooksData(data.results);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Context.Provider value={booksData}>
      <Navbar />
      <Outlet />
    </Context.Provider>
  );
}

export default App;
