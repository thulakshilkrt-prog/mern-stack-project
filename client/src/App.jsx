import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./User";
import Adduser from "./adduser/add user";
import Update from "./update";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User page page - Home page */}
        <Route path="/user" element={<User />} />

        {/* Add page User - Home page*/}
        <Route path="/adduser" element={<Adduser />} />

        {/* Update page User - Home page*/}
        <Route path="/update/:id" element={<Update />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;