import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { editMeal } from '../modules/mealManager';
import { AddExercise } from '../modules/exerciseManager';

export default function ExerciseForm () {
  const location = useLocation();
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState();
  const [exerciseCalories, setExerciseCalories] = useState();


  const submitExercise = () => {
    AddExercise(exerciseName, exerciseCalories).then(navigate("/"))
  }
  return (
    <>
      <h2>Add in your exercise!</h2>
            <Form onSubmit={submitExercise}>
            <FormGroup>
                <Label htmlFor="title">Name</Label>
                <Input name="exerciseName"
                type="text" placeholder='Enter new name here'
                onChange={(e) => setExerciseName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="content">Calories</Label>
                <Input name="content"
                type="textarea" placeholder='Enter calories burned'
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