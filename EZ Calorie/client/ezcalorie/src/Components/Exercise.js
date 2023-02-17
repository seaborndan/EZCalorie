import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { deleteExercise } from '../modules/exerciseManager';
import { Button } from 'reactstrap';
export default function Exercise ({exercise}) {
  return (
  <>
    <Col>
      <Col className="d-flex align-items-end justify-content-center">{exercise.name}
      </Col>  
    </Col>
    
    <Col>
      <Col className="d-flex align-items-end justify-content-center">{exercise.caloriesBurned} Calories Burned
      </Col>
    </Col>
    <Col>
      <Col className="d-flex align-items-end justify-content-center"> <Link to={"/editExercise"} state={exercise}>
      Edit</Link>
      </Col>
    </Col>
    <Col>
      <Col className="d-flex align-items-end justify-content-center">      <Button onClick={() => { deleteExercise(exercise.id).then(window.location.reload()) }}>Delete Exercise</Button>
      </Col>
    </Col>
      
  </>
  )

}