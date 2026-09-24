import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Adduser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    adress: "",
    countryCode: "+94",
    phone: "",
    action: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/users",
        {
          name: user.name,
          email: user.email,
          adress: user.adress,
          phone: user.phone,
          countryCode: user.countryCode,
          action: user.action,
        }
      );

      toast.success("User added successfully!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add user"
      );
    }
  };

  const boxStyle = {
    backgroundColor: "rgb(205, 237, 255)",
    border: "2px solid #ff0707",
    borderRadius: "6px",
    padding: "10px",
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "600px",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{ color: "#6f42c1" }}
      >
        Add New User
      </h2>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            style={boxStyle}
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Email
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            style={boxStyle}
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Address
          </label>

          <input
            type="text"
            name="adress"
            className="form-control"
            style={boxStyle}
            value={user.adress}
            onChange={handleChange}
            required
          />
        </div>

        {/* COUNTRY CODE */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Country Code
          </label>

          <select
            name="countryCode"
            className="form-select"
            style={boxStyle}
            value={user.countryCode}
            onChange={handleChange}
          >
            <option value="+94">
              +94 - Sri Lanka
            </option>

            <option value="+91">
              +91 - India
            </option>

            <option value="+44">
              +44 - United Kingdom
            </option>

            <option value="+1">
              +1 - United States
            </option>

            <option value="+1">
              +1 - Canada
            </option>

            <option value="+61">
              +61 - Australia
            </option>

            <option value="+64">
              +64 - New Zealand
            </option>

            <option value="+65">
              +65 - Singapore
            </option>

            <option value="+60">
              +60 - Malaysia
            </option>

            <option value="+62">
              +62 - Indonesia
            </option>

            <option value="+66">
              +66 - Thailand
            </option>

            <option value="+86">
              +86 - China
            </option>

            <option value="+81">
              +81 - Japan
            </option>

            <option value="+82">
              +82 - South Korea
            </option>

            <option value="+971">
              +971 - United Arab Emirates
            </option>

            <option value="+974">
              +974 - Qatar
            </option>

            <option value="+966">
              +966 - Saudi Arabia
            </option>

            <option value="+968">
              +968 - Oman
            </option>

            <option value="+973">
              +973 - Bahrain
            </option>

            <option value="+965">
              +965 - Kuwait
            </option>

            <option value="+92">
              +92 - Pakistan
            </option>

            <option value="+880">
              +880 - Bangladesh
            </option>

            <option value="+977">
              +977 - Nepal
            </option>

            <option value="+49">
              +49 - Germany
            </option>

            <option value="+33">
              +33 - France
            </option>

            <option value="+39">
              +39 - Italy
            </option>

            <option value="+34">
              +34 - Spain
            </option>

            <option value="+41">
              +41 - Switzerland
            </option>

            <option value="+46">
              +46 - Sweden
            </option>

            <option value="+31">
              +31 - Netherlands
            </option>

            <option value="+7">
              +7 - Russia
            </option>

            <option value="+55">
              +55 - Brazil
            </option>

            <option value="+27">
              +27 - South Africa
            </option>

            <option value="+1">🇺🇸 +1 - USA</option>
            <option value="+44">🇬🇧 +44 - UK</option>
          </select>
        </div>

        {/* PHONE NUMBER */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            className="form-control"
            style={boxStyle}
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* ACTION */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Action
          </label>

          <select
            name="action"
            className="form-select"
            style={boxStyle}
            value={user.action}
            onChange={handleChange}
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* BUTTONS */}
        <button
          type="submit"
          className="btn btn-primary me-2"
        >
          Add User
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Back
        </button>

      </form>
    </div>
  );
};

export default Adduser;