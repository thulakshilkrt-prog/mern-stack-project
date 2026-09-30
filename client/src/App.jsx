import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./User";
import Adduser from "./adduser/add user";
import Update from "./update";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User List - Home List */}
        <Route path="/" element={<User />} />

        {/* Add User - Home List*/}
        <Route path="/adduser" element={<Adduser />} />

        {/* Update User - Home List*/}
        <Route path="/update/:id" element={<Update />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;