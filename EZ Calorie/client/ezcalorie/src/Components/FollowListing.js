import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Follow } from '../modules/userManager';
export default function FollowListing ({potentialFollow}) {
  const navigate = useNavigate();
  const handleFollowClick = () => {
    Follow(potentialFollow.id).then(navigate("/"))
  }
  return (
  <>
    <Col className='mt-4'>
       <p>{potentialFollow.displayName} Current Weight: {potentialFollow.currentWeight} and their goal is {potentialFollow.goalWeight}</p>
       <Button onClick={() => { handleFollowClick() }}>Follow</Button>
    </Col>
  </>
  )

}