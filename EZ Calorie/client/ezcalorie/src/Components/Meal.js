import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DeleteMeal } from '../modules/mealManager';
export default function Meal ({meal}) {
  return (
  <>
    <Col className='mb-4' xs={2} md={4} lg={6}>
       {meal.mealType.name}: {meal.name}
      <br></br>
    
      {meal.calories} Calories
      <br></br>
      <Link to={"/editMeal"} state={meal}>Edit Meal</Link>
      <br></br>
      <Button onClick={() => { DeleteMeal(meal.id).then(window.location.reload()) }}>Delete Meal</Button>
      </Col>
      <br></br>
  </>
  )

}