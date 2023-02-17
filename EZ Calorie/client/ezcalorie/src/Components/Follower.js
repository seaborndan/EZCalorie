import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";

export default function Follower ({follower}) {
  return (
  <>
    <Col className='mb-5'>
      {follower.displayName}
      <br></br>
    
      <p>Current Weight: {follower.currentWeight} Goal Weight: {follower.goalWeight} </p>
    </Col>
  </>
  )

}