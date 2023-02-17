import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Button, Container, Form, FormGroup, Input, Label, Table } from "reactstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { editPersonalDetails, editUserDisplayName, _getByEmail } from "../modules/userManager";


export default function EditPersonalDetails(props) {
  const [currUser, setCurrUser] = useState({});
  const [newDispName, setNewDispName] = useState();
  const [newHeight, setNewHeight] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.currUser;
  console.log(location, " useLocation Hook");
  console.log(location.state.currUser.id);

  useEffect(() => {
    document.getElementById("edit-save-btn").disabled = true
  }, [])

  const changeDisplayNameState = (e) => {
    if (e.target.value.trim() === "" || e.target.value === null) {
        // Disable the save button if input is empty
        document.getElementById("edit-save-btn").disabled = true
    } else {
        document.getElementById("edit-save-btn").disabled = e.target.value === currUser.displayName
    }
    setNewDispName(e.target.value)
  }

  const changeHeightState = (e) => {
    if (e.target.value.trim() === "" || e.target.value === null) {
        // Disable the save button if input is empty
        document.getElementById("edit-save-btn").disabled = true
    } else {
        document.getElementById("edit-save-btn").disabled = e.target.value === currUser.displayName
    }
    setNewHeight(e.target.value)
  }

  const editUser = (e) => {
    e.preventDefault();
    var newDisplayName = newDispName;

    if(user.displayName) {
      editPersonalDetails(user.id, user.displayName, newDisplayName, user.height, newHeight)
        .then(res => {
          if(res.ok) {
            navigate("/")
          }
        })
    }
  }

  return (
    <div className="m-4">

        <h1>Editing User: {user ? user.displayName : "Hello"}</h1>
        <Form onSubmit={editUser}>
          <FormGroup>
            <Label htmlFor="displayName">Display Name</Label>
            <Input name="displayName" className="w-auto" placeholder={user.displayName} value={newDispName} onChange={changeDisplayNameState}></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="newHeight">Height</Label>
            <Input name="newHeight" className="w-auto" placeholder={user.height} value={newHeight} onChange={changeHeightState}></Input>
          </FormGroup>
          <Button id="edit-save-btn" color="success">Save</Button>  
        </Form>
    </div>
    
  );
}