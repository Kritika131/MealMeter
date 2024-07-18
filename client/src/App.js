import React from "react";
// import { BrowserRouter , Route,Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
  ]);
  return (
    <div className="App">
      {/* <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes> */}
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
