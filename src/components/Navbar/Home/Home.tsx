import App from "../../../App";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  // Fetch Books Data by Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gutendex.com/books");
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
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
