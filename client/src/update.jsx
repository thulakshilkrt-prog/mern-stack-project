import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import "./update.css";

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

  // GET USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${id}`
        );

        setUser({
          name: response.data.name || "",
          email: response.data.email || "",
          adress: response.data.adress || "",
          countryCode: response.data.countryCode || "+94",
          phone: response.data.phone || "",
          action: response.data.action || "Active",
        });
      } catch (error) {
        console.log("GET USER ERROR:", error);
        toast.error(
          error.response?.data?.message || "Failed to load user"
        );
      }
    };

    fetchUser();
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/update/${id}`,
        user
      );

      console.log("UPDATE RESPONSE:", response.data);

      toast.success("User updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(
        "UPDATE ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update user"
      );
    }
  };

  return (
    <div className="updateuser">
      <Toaster position="top-right" />

      {/* BACK BUTTON */}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h2>Update User</h2>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="adress"
            placeholder="Enter Address"
            value={user.adress}
            onChange={handleChange}
            required
          />
        </div>

        {/* COUNTRY CODE */}
        <div className="mb-3">
          <label>Country Code</label>

          <select
            className="form-control"
            name="countryCode"
            value={user.countryCode}
            onChange={handleChange}
            required
          >

  <option value="+94">+94 - Sri Lanka</option>
  <option value="+91">+91 - India</option>
  <option value="+44">+44 - United Kingdom</option>
  <option value="+1">+1 - United States</option>
  <option value="+61">+61 - Australia</option>
  <option value="+86">+86 - China</option>
  <option value="+81">+81 - Japan</option>
  <option value="+82">+82 - South Korea</option>
  <option value="+65">+65 - Singapore</option>
  <option value="+60">+60 - Malaysia</option>
  <option value="+971">+971 - United Arab Emirates</option>
  <option value="+974">+974 - Qatar</option>
  <option value="+966">+966 - Saudi Arabia</option>
  <option value="+968">+968 - Oman</option>
  <option value="+973">+973 - Bahrain</option>
  <option value="+92">+92 - Pakistan</option>
  <option value="+880">+880 - Bangladesh</option>
  <option value="+977">+977 - Nepal</option>
  <option value="+49">+49 - Germany</option>
  <option value="+33">+33 - France</option>
  <option value="+39">+39 - Italy</option>
  <option value="+34">+34 - Spain</option>
  <option value="+7">+7 - Russia</option>
  <option value="+55">+55 - Brazil</option>
  <option value="+27">+27 - South Africa</option>
  <option value="+64">+64 - New Zealand</option>
  <option value="+1">+1 - Canada</option>
          </select>
        </div>

        {/* PHONE NUMBER */}
        <div className="mb-3">
          <label>Phone Number</label>

          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter phone number"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* UPDATE BUTTON */}
        <button
          type="submit"
          className="btn btn-primary"
        >
          Update
        </button>

      </form>
    </div>
  );
};

export default Update;

