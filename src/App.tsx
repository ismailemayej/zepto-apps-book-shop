import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Navbar/Home/Home";
import WishList from "./components/Navbar/WishList/WishList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // this is Children Route
    children: [{ path: "/wishlist", element: <WishList /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
