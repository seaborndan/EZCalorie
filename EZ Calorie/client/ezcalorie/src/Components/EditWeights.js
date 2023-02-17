import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Button, Container, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { addUserGoalWeight, editUserCurrentWeight, editUserGoalWeight } from "../modules/userManager";
import Col from 'react-bootstrap/Col';




export default function EditWeights(props) {
  const [currUser, setCurrUser] = useState({});
  const [newCurrWeight, setNewCurrWeight] = useState();
  const [newGoalWeight, setNewGoalWeight] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.currUser;
  console.log(location, " useLocation Hook");
  console.log(location.state.currUser.id);

  const changeCurrWeightState = (e) => {
    setNewCurrWeight(e.target.value)
  }

  const changeGoalWeightState = (e) => {
    setNewGoalWeight(e.target.value)
  }

  const editUser = (e) => {
    e.preventDefault();
    var newCurrentWeight = newCurrWeight;
    var newGoal = newGoalWeight

    if(user.currentWeight && !user.goalWeight) {
      editUserCurrentWeight(user.id, user.currentWeight, newCurrentWeight)
        .then(res => {
          if(res.ok) {
          }
        })
        addUserGoalWeight(user.id, newGoal)
        .then(res => {
          if(res.ok) {
            navigate("/")
          }
        })
    }

    if(user.currentWeight && user.goalWeight) {
      editUserCurrentWeight(user.id, user.currentWeight, newCurrentWeight)
        .then(res => {
          if(res.ok) {
          }
        })
        editUserGoalWeight(user.id, user.goalWeight, newGoal)
        .then(res => {
          if(res.ok) {
            navigate("/")
          }
        })
    }

    if(user.currentWeight) {
      editUserCurrentWeight(user.id, user.currentWeight, newCurrentWeight)
        .then(res => {
          if(res.ok) {
            navigate("/")
          }
        })
    }

    if(user.goalWeight) {
      editUserGoalWeight(user.id, user.goalWeight, newGoal)
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
            <Label htmlFor="displayName">Current Weight</Label>
            <Col className="d-flex align-items-end justify-content-center">
            <Input name="displayName" className="w-auto" placeholder={user.currentWeight} value={newCurrWeight} onChange={changeCurrWeightState}></Input>
            </Col>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="displayName">Goal</Label>
            <Col className="d-flex align-items-end justify-content-center">
            <Input name="displayName" className="w-auto" placeholder={user.goalWeight} value={newGoalWeight} onChange={changeGoalWeightState}></Input>
            </Col>
          </FormGroup>
          <Button id="post-save-btn">Save</Button>  
        </Form>
    </div>
    
  );
}