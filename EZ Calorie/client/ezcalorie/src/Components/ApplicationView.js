import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./HomePage";
import { _getByEmail } from "../modules/userManager";
import firebase from 'firebase';

export default function ApplicationViews({ isLoggedIn }) {


  return (
    <main>
      <Routes>
        <Route path="/">
        <Route
            index
            element={isLoggedIn ? <HomePage/> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};