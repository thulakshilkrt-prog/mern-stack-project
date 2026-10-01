import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    adress: "",
    countryCode: "+94",
    phone: "",
    action: "Active",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${id}`
        );

        setUser({
          name: response .data .name || "",
          email: response .data.email || "",
          adress: response.data.adress || "",
          countryCode: response.data.countryCode || "+94",
          phone: response.data.phone || "",
          action: response.data.action || "Active",
        });
      } catch (error) {
        console.error(error);

        toast.error("Failed to get user");
      }
    };

    getUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/users/update/${id}`,
        user
      );

      toast.success("User updated successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update user"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update User</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>

          <input
            type="text"
            name="adress"
            className="form-control"
            value={user.adress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Country Code
          </label>

          <select
            name="countryCode"
            className="form-select"
            value={user.countryCode}
            onChange={handleChange}
          >
            <option value="+94">+94 - Sri Lanka</option>
            <option value="+91">+91 - India</option>
            <option value="+44">+44 - UK</option>
            <option value="+1">+1 - USA</option>
            <option value="+61">+61 - Australia</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            className="form-control"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Action</label>

          <select
            name="action"
            className="form-select"
            value={user.action}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-success me-2"
        >
          Update User
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Update;