import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WishList from "./components/WishList/WishList";

import "./index.css";
import App from "./App";
import Home from "./components/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // this is Children Route
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/wishlist", element: <WishList /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
