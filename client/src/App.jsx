import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./User";
import Adduser from "./adduser/add user";
import Update from "./update";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User List - Home page */}
        <Route path="/" element={<User />} />

        {/* Add User - Home page*/}
        <Route path="/adduser" element={<Adduser />} />

        {/* Update User - Home page*/}
        <Route path="/update/:id" element={<Update />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;