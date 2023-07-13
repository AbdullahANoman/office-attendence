
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AttendenceForm from "./Components/AttendenceForm/AttendenceForm.jsx";
import AuthProvider from "./Providers/AuthProviders.jsx";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/form",
    element: <AttendenceForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster></Toaster>
    <RouterProvider router={router} />
  </AuthProvider>
);
