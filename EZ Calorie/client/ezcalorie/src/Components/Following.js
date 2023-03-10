import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { Unfollow } from '../modules/userManager';
import { Button } from 'reactstrap';
import { render } from '@testing-library/react';
export default function Following ({following}) {
  return (
  <>
    <Col>
      {following?.displayName}
      <br></br>
      <p className='pt-2'>Current Weight: {following?.currentWeight}</p>
      <p> Goal Weight: {following?.goalWeight} </p>
      <Button id="delete-button" onClick={() => { Unfollow(following.id).then(window.location.reload()) }}>Unfollow</Button>
    </Col>
  </>
  )

}