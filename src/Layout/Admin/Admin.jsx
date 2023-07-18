
import Container from "../../Shared/Container/Container";
// import { Link, Outlet } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  
  return (
    <Container>
      <div className="grid grid-cols-7">
        <nav className="mt-2 md:mt-5 bg-blue-400 col-span-1">
          <ul>
            <Link to="/admin/manageUser">
              <li>Manage User</li>
            </Link>
            <Link to="/admin/employeeInformation">
              <li>Employee Information</li>
            </Link>
          </ul>
        </nav>
        <div className="col-span-6">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
};

export default Admin;
