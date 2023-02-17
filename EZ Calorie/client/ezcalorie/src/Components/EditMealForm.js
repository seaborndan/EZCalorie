import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { editMeal } from '../modules/mealManager';

export default function EditMeal (props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mealName, setMealName] = useState();
  const [mealCalories, setMealCalories] = useState();
  const [mealTypeId, setMealTypeId] = useState();


  const submitMealEdit = () => {
    editMeal(location.state.id, mealName, mealCalories, mealTypeId).then(navigate("/"));
  }
  return (
    <>
      <h2>Edit Your Meal: {location.state.name}</h2>
            <Form onSubmit={submitMealEdit}>
            <FormGroup className='text-center'>
                <Label htmlFor="title">Name</Label>
                <Col className="d-flex justify-content-center">
                  <Input name="name"
                  type="text" className='text-center' placeholder='Enter new name here'
                  onChange={(e) => setMealName(e.target.value)}
                  />
                </Col>
            </FormGroup>
            
            <FormGroup>
                <Label htmlFor="content">Calories</Label>
                <Col className="d-flex align-items-end justify-content-center">
                  <Input name="content"
                  type="textarea" className='text-center' placeholder='Enter caloric value'
                  onChange={(e) => setMealCalories(e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="imageLocation">Meal Type</Label>
                <Col className="d-flex align-items-end justify-content-center">
                  <Input name="imageLocation"
                  type="text" className='text-center' placeholder='Set Meal Type: 1 for breakfast, 2 for lunch, 3 for dinner, 4 for snack'
                  onChange={(e) => setMealTypeId(e.target.value)}/>
                </Col>
            </FormGroup>  

            <Button className='hover-zoom' id="post-save-btn">
                Save
            </Button>

            </Form>
    </>
  )
}