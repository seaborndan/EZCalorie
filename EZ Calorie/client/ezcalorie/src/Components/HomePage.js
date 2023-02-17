import React, { useEffect, useState } from "react";
import { getFollowers, getFollowing, _getByEmail } from "../modules/userManager";
import firebase from 'firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { getAllMeals, handleMeal } from "../modules/mealManager";
import Meal from "./Meal";
import { getAllExercises } from "../modules/exerciseManager";
import Exercise from "./Exercise";
import Follower from "./Follower";
import Following from "./Following";
import { Button } from "reactstrap";


export default function HomePage() {
  const [currUser, setCurrUser] = useState({});
  const [meals, setMeals] = useState([]);
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0.0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0.0);
  const [exercises, setExercises] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [caloriesNeededToGain, setCaloriesNeededToGain] = useState();
  const [caloriesNeededToLose, setCaloriesNeededToLose] = useState();
  const [message, setMessage] = useState("");
  const [netCalories, setNetCalories] = useState();

  const motivationalMessages = [
    {message: "You can do this!"},
    {message: "Only I Can Change My Life, No One Can Do It For Me"},
    {message: "Slow And Steady Wins The Race"},
    {message: "The Struggle You Are In Today Is Developing The Strength You Need for Tomorrow"}
  ];
  
  //displaying a new motivational message on each render
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * motivationalMessages.length);
    setMessage(motivationalMessages[randomNumber].message);
  }, [])

  // getting current user using firebase identifier
  let fireUser = firebase.auth().currentUser;
  useEffect(() => {
      _getByEmail(fireUser.email).then(data => {
        setCurrUser(data)
      })
  }, []);

  useEffect(() => {
    getAllMeals().then(meals =>
    setMeals(meals));
  }, []);


  useEffect(() => {
    getAllExercises().then(exercises =>
    setExercises(exercises));
  }, []);

  useEffect(() => {
    var total = 0.0;
    meals.forEach((m) => {
      total += m.calories
    })
    setTotalCaloriesConsumed(total)
  })

  useEffect(() => {
    var total = 0.0;
    exercises.forEach((e) => {
      total += e.caloriesBurned
    })
    setTotalCaloriesBurned(total)
    
  })

  useEffect(() => {
    getFollowers().then(followers => 
    setFollowers(followers));
  }, [])

  useEffect(() => {
    getFollowing().then(following => 
    setFollowing(following));
  }, [])

  useEffect(() => {
    var net = 0;
    net = totalCaloriesConsumed - totalCaloriesBurned;
    setNetCalories(net);    
  })

  useEffect(() => {
        /* 
      tdee is calcuated by 66 + (13.7 X weight in kg) + (5 x height in cm) – (6.8 x age in yrs) * 1.55.
      used 5'9 as average height until height property is implemented, 25 as age
      Added 200 for caloric surplus needed to gain weight
      Used moderately active modifier (1.55) in equation
    */
    var tdee = 0;
    tdee = Math.round((66 + (13.7 * (currUser.currentWeight/2.2) + (5 * 175.259) -(6.8 * 25))) * 1.55 + 200) ;
    setCaloriesNeededToGain(tdee)
  })

  useEffect(() => {
    /* 
      tdee is calcuated by 66 + (13.7 X weight in kg) + (5 x height in cm) – (6.8 x age in yrs).
      used 5'9 as average height until height property is implemented, 25 as age
      Subtracted 200 needed for caloric deficit
      Used moderately active modifier (1.55) in equation
    */
    var tdee = 0;
    tdee = Math.round((66 + (13.7 * (currUser.currentWeight/2.2) + (5 * 175.259) -(6.8 * 25))) * 1.55 - 200);
    setCaloriesNeededToLose(tdee)
    
  })

  const displayCaloriesNeeded = () => {
    if(currUser.currentWeight < currUser.goalWeight) {
      return <h4>Calories needed to gain: {caloriesNeededToGain}</h4>
    }
    else if(currUser.currentWeight > currUser.goalWeight) {
      return <h4>Calories needed to lose weight: {caloriesNeededToLose}</h4>
    }
    
  }
  return (
    <>
    
      
      <h1>Welcome To Your EZ Calorie Profile</h1>
      <Container>
        <Row className="justify-content-md-left h-100">
          <Col xs lg="6" className="square border">
            <h2>{currUser.displayName}</h2>
            <Col className="d-flex align-items-end justify-content-center" style={{ height: "200px" }}>
            <h4>{message}</h4>
            
            </Col>
          <p className="mt-5">See who's following you!</p>
          {/* Map through users that follow the current user */}
          {followers.map((f) => (
            <Follower key = {f.id} follower={f} />
          ))}
          {/* Map through users followed by the current user */}
          <p>Users you are following:</p>
          {following.map((f) => (
            <Following key = {f.id} following={f} />
          ))}
          
          <Link to={"/followForm"}><p>Follow someone new!</p></Link>
          </Col>
          <Col className="square border h-100" xs lg="6"><h2>Tracking Your Progress</h2>
          {displayCaloriesNeeded()}
            <Row>
              <h4>Net Calories Today: {netCalories}</h4>
              <Col>
              <Col className="d-flex align-items-end justify-content-center" style={{ height: "200px" }} >Your Current Weight!
              </Col>
              {currUser.currentWeight}
              </Col>
              <Col>
              <Col className="d-flex align-items-end justify-content-center" style={{ height: "200px" }}>Your Goal Weight! 
              </Col>
              {currUser.goalWeight}</Col>
              <Link to="/editWeights" state={{currUser: currUser}}>Edit Weights</Link>
            </Row>
            <Row className="justify-content-md-left h-100 mt-5">
              <Col>
                <h2>Your Meals Today</h2>
                <Row>
                  {meals.map((m) => (
                    <Meal key={m.id} meal={m} />
                    
                  ))}
                 
                  
                </Row>
                
                <br></br>
                <Link to="/addMeal">Add Meal</Link>
                <h4>Total Calories Consumed: {totalCaloriesConsumed}</h4>
                
              </Col>
              
            </Row>
            <Row className="justify-content-md-left h-100 mt-5">
              <Col>
                <h2>Your Exercises Today</h2>
                <Row>
                  {exercises.map((e) => (
                    <Exercise key={e.id} exercise={e} />
                    
                  ))}
                  
                </Row>
                <Link to={"/exerciseForm"}>Add Exercise</Link>
                <br></br>
                <h4>Total Calories Burned: {totalCaloriesBurned}</h4>
              </Col>
            </Row>
            
          </Col>

        </Row>
        <Row>
          <Col sm={6} xs={6}>
            <Link to="/editPersonal" state={{currUser: currUser}}>Edit Personal Details</Link>
          </Col>
          <Col sm={6}>
            
            </Col>
        </Row>

        
      </Container>
    </>
  );
  
}