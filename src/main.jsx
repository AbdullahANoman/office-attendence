
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AttendenceForm from "./Components/AttendenceForm/AttendenceForm.jsx";
import AuthProvider from "./Providers/AuthProviders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AttendenceForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
