
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./User";
import Adduser from "./adduser/add user";
import Update from "./update";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home page */}
        <Route path="/" element={<User />} />

        {/* User list page */}
        <Route path="/user" element={<User />} />

        {/* Add user page */}
        <Route path="/adduser" element={<Adduser />} />

        {/* Update user page */}
        <Route path="/update/:id" element={<Update />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

