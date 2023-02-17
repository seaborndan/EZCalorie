import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { getFollowList, Unfollow } from '../modules/userManager';
import { Button } from 'reactstrap';
import FollowListing from './FollowListing';
export default function FollowForm () {
  const [potentialFollowers, setPotentialFollowers] = useState([]);
  
  useEffect(() => {
    getFollowList().then(followers =>
    setPotentialFollowers(followers));
  }, [])
  
  
  return (
  <>
    <h2>Choose who you want to follow!</h2>
    {potentialFollowers.map((f) => (
      <FollowListing key={f.id} potentialFollow={f} />
    ))}
  </>
  )

}