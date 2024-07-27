import React from "react";
import Login from "./Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browser from "./browse/Browser";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browser", element: <Browser /> },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
