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
  <Row className='mt-2'>
    <Col>
      <Col className="d-flex align-items-end justify-content-center">{exercise.name}
      </Col>  
    </Col>
    
    <Col>
      <Col className="d-flex align-items-end justify-content-center">{exercise.caloriesBurned} Calories Burned
      </Col>
    </Col>
    <Col>
      <Col className="d-flex align-items-end justify-content-center">  
        <Link to={"/editExercise"} state={exercise}>
          <Button id="edit-button">
            Edit
          </Button>
        </Link>
      </Col>
    </Col>
    <Col>
      <Col className="d-flex align-items-end justify-content-center">      <Button id="delete-button" onClick={() => { deleteExercise(exercise.id).then(window.location.reload()) }}>Delete Exercise</Button>
      </Col>
    </Col>
  </Row>
      
  </>
  )

}