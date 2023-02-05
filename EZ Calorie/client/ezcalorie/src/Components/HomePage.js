import React, { useEffect, useState } from "react";
import User from "./User";
import { _getByEmail } from "../modules/userManager";
import firebase from 'firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function HomePage() {
  const [currUser, setCurrUser] = useState({});
  let fireUser = firebase.auth().currentUser;
  useEffect(() => {
      _getByEmail(fireUser.email).then(data => {
        setCurrUser(data)
      })
  }, []);

  return (
    <>
      <h1>Your EZ Calorie Profile</h1>
      <Container>
        <Row className="justify-content-md-left">
          <Col xs lg="6"><h2>{currUser.displayName}</h2></Col>
          <Col xs lg="6">3 of 3</Col>
        </Row>
      </Container>
    </>
  );
  
}