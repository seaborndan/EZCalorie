import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'

export default function User({ user }) {
  



  return (
    <div className="m-4">

        <p>User: {user.email}</p>

    </div>
  );
}