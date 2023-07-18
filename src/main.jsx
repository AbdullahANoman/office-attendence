
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AttendenceForm from "./Components/AttendenceForm/AttendenceForm.jsx";
import AuthProvider from "./Providers/AuthProviders.jsx";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import Admin from "./Layout/Admin/Admin";
// import ManageUser from "./Components/Admin/ManageUser/ManageUser";
import ManageUser from "./Components/Admin/ManageUser/ManageUser";
import EmployeementInformation from "./Components/Admin/EmployeementInformation/EmployeementInformation";

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
  {
    path : '/admin',
    element : <Admin></Admin>,
    children : [
      {
        path : 'manageUser',
        element: <ManageUser></ManageUser>
      },
      {
        path: 'employeeInformation',
        element : <EmployeementInformation></EmployeementInformation>
      }
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster></Toaster>
    <RouterProvider router={router} />
  </AuthProvider>
);
