import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { handleMeal, UserMeal } from "../modules/mealManager";

export default function AddMeal () {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [mealType, setMealType] = useState();
  const [dropTitle, setDropTitle] = useState();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    
    setDropTitle(renderToggle(mealType));
  })

  const submitMeal = (e) => {
    e.preventDefault();
    
    handleMeal(query).then(newMeal => {
      (UserMeal(newMeal[0], mealType)).then(navigate("/"))
    })
    console.log("HERE")
    

  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const changeMealType = (e) => {
    setMealType(e.currentTarget.value)
  }

  const renderToggle = (param) => {
      switch(param) {
        case '1':
          return 'Breakfast'
        case '2':
          return 'Lunch'
        case '3':
          return 'Dinner'
        case '4':
          return 'Snack'
        default:
          return 'Dropdown'
      }
    
  }

  return (
    <>
        <h2>New Meal</h2>
        <Form onSubmit={submitMeal}>
        <FormGroup>
            <Label htmlFor="Name">Just type in the name of your meal here!</Label>
            <Input name="query"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
        <Dropdown  isOpen={open} toggle={handleOpen} onChange={(e) => setMealType(e.target.value)}>
        <DropdownToggle caret>
          {dropTitle}
        </DropdownToggle>
        <DropdownMenu onChange={(e) => setMealType(e.target.value)}>
          <DropdownItem onClick={changeMealType} value='1'>Breakfast</DropdownItem>
          <DropdownItem onClick={changeMealType} value='2'>
            Lunch
          </DropdownItem>
          <DropdownItem onClick={changeMealType} value='3'>Dinner</DropdownItem>
          <DropdownItem onClick={changeMealType} value='4'>Snack</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </FormGroup>
        <Button
            id="post-save-btn"
            color="success">
                Save
            </Button>

        </Form>
    </>
)


};