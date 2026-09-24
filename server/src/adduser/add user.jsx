
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

      // Backend response is { users: [...] }
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Get users error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to get users"
      );
    }
  };

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
      await axios.delete(
        `http://localhost:8000/api/users/${id}`
      );

      toast.success("User deleted successfully");

      getUsers();
    } catch (error) {
      console.error("Delete error:", error);

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
        <h2>User List</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/adduser")}
        >
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
            Add New User
          </button>
        </div>
      ) : (

        /* USER TABLE */
        <div className="table-responsive">
          <table className="table table-bordered table-striped">

            <thead className="table-dark">
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (

                <tr key={user._id}>

                  <td>{index + 1}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.adress}</td>

                  <td>
                    {user.countryCode || "+94"}{" "}
                    {user.phone || user.phoneno || ""}
                  </td>

                  <td>

                    {/* EDIT BUTTON */}
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(`/update/${user._id}`)
                      }
                    >
                      Edit
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(user._id)
                      }
                    >
                      Delete
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

