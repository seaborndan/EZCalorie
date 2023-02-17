import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { editExercise } from '../modules/exerciseManager';


export default function EditExercise (props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState();
  const [exerciseCalories, setExerciseCalories] = useState();


  const submitExerciseEdit = () => {
    editExercise(location.state.id, exerciseName, exerciseCalories).then(navigate("/"));
  }
  return (
    <>
      <h2>Edit Your Meal: {location.state.name}</h2>
            <Form onSubmit={submitExerciseEdit}>
            <FormGroup>
                <Label htmlFor="title">Name</Label>
                <Input name="name"
                type="text" placeholder='Enter new name here'
                onChange={(e) => setExerciseName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="content">Calories Burned</Label>
                <Input name="content"
                type="textarea" placeholder='Enter caloric value'
                onChange={(e) => setExerciseCalories(e.target.value)}/>
            </FormGroup>

            <Button
                id="post-save-btn"
                color="success">
                    Save
                </Button>

            </Form>
    </>
  )
}