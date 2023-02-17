import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./HomePage";
import { _getByEmail } from "../modules/userManager";
import firebase from 'firebase';
import EditPersonalDetails from "./EditPersonalDetails";
import EditWeights from "./EditWeights";
import AddMeal from "./AddMeal";
import FollowForm from "./FollowForm";
import EditMeal from "./EditMealForm";
import EditExercise from "./EditExercise";
import ExerciseForm from "./ExerciseForm";

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
          <Route path="/editPersonal" element={<EditPersonalDetails />} />
          <Route path="/editWeights" element={<EditWeights />} />
          <Route path="/followform" element={<FollowForm/>} />
          <Route path="addMeal" element={<AddMeal />} />
          <Route path="/editMeal" element={<EditMeal />} />
          <Route path="/editExercise" element={<EditExercise/>} />
          <Route path="/exerciseForm" element={<ExerciseForm/>} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};