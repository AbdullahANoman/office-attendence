import { useEffect, useState } from "react";

const ManageUser = () => {
  const [regUsers, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  console.log(regUsers);

  const handleUpdateAdmin = (user) => {
    const loggedUser = user ;
    console.log(loggedUser)
    fetch(`http://localhost:5000/users/admin/${loggedUser?._id}`,{
        method : 'PATCH'
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  };
  const handleUpdateEmployee = (user) => {
    const loggedUser = user ;
    console.log(loggedUser)
    fetch(`http://localhost:5000/users/employee/${loggedUser?._id}`,{
        method : 'PATCH'
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  };
  return (
    <div className="w-full mx-10">
      <p className="text-4xl font-bold m-5">Total Users : {regUsers?.length}</p>
      <div className="overflow-x-auto  ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {regUsers?.map((regUser, index) => (
              <tr key={regUser?.email}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={regUser?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{regUser?.name}</td>
                <td>{regUser?.email}</td>
                <td>
                  {regUser?.role == "admin" ||
                    ("Admin" && "Admin") ||
                    regUser?.role == "employee" ||
                    ("Employee" && "Employee")}
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateAdmin(regUser)}
                    className="btn btn-primary"
                    disabled={regUser?.role ===  "Admin"}
                  >
                    Make Admin
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateEmployee(regUser)}
                    className="btn btn-accent"
                    disabled={regUser?.role === "Employee"}
                  >
                    Make Employee
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
