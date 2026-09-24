import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const User = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // GET ALL USERS
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users"
      );

      console.log("GET USERS:", response.data);

      setUsers(response.data || []);
    } catch (error) {
      console.error("Get users error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to get users"
      );
    }
  };

  // LOAD USERS
  useEffect(() => {
    getUsers();
  }, []);

  // DELETE USER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/users/${id}`
      );

      console.log("DELETE RESPONSE:", response.data);

      toast.success("User deleted successfully");

      // Refresh user list
      getUsers();
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  return (
    <div className="container mt-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#c19742" }}>
          User List
        </h2>

        <button
  className="btn"
  style={{
    backgroundColor: "#c1426a",
    color: "white",
    border: "none",
  }}
  onClick={() => navigate("/adduser")}
>
  <i className="fa-solid fa-user-plus me-2"></i>
  Add New User
</button>
      </div>

      {/* NO DATA */}
      {users.length === 0 ? (
        <div className="text-center mt-5">

          <h4>No Data to display</h4>

          <p>Please add New User</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/adduser")}
          >
            <i className="fa-solid fa-user-plus me-2"></i>
            Add New User
          </button>

        </div>
      ) : (

        /* USER TABLE */
        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            {/* TABLE HEADER */}
            <thead>
              <tr>

                {/* S.NO */}
                <th
                  style={{
                    backgroundColor: "#c1424f",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  S.No.
                </th>

                {/* NAME */}
                <th
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                  }}
                >
                  Name
                </th>

                {/* EMAIL */}
                <th
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                  }}
                >
                  Email
                </th>

                {/* ADDRESS */}
                <th
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                  }}
                >
                  Address
                </th>

                {/* PHONE */}
                <th
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                  }}
                >
                  Phone No
                </th>

                {/* ACTION */}
                <th
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Action
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {users.map((user, index) => (

                <tr key={user._id}>

                  {/* S.NO */}
                  <td style={{ textAlign: "center" }}>
                    {index + 1}
                  </td>

                  {/* NAME */}
                  <td>
                    {user.name}
                  </td>

                  {/* EMAIL */}
                  <td>
                    {user.email}
                  </td>

                  {/* ADDRESS */}
                  <td>
                    {user.adress}
                  </td>

                  {/* PHONE */}
                  <td>
                    {user.countryCode || "+94"}{" "}
                    {user.phone || ""}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >

                    {/* UPDATE BUTTON */}
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(`/update/${user._id}`)
                      }
                      title="Edit User"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      title="Delete User"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default User;

