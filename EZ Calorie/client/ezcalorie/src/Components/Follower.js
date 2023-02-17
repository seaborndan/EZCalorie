import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";

export default function Follower ({follower}) {
  return (
  <>
    <Col className='mb-2'>
      {follower.displayName}
      <br></br>
    
      <p className='pt-2'>Current Weight: {follower.currentWeight}</p>
      <p> Goal Weight: {follower.goalWeight} </p>
    </Col>
  </>
  )

}