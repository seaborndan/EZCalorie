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
      used 25 as age
      Added 200 for caloric surplus needed to gain weight
      Used moderately active modifier (1.55) in equation
    */
    var tdee = 0;
    tdee = Math.round((66 + (13.7 * (currUser.currentWeight/2.2) + (5 * currUser.height) -(6.8 * 25))) * 1.55 + 200) ;
    setCaloriesNeededToGain(tdee)
  })

  useEffect(() => {
    /* 
      tdee is calcuated by 66 + (13.7 X weight in kg) + (5 x height in cm) – (6.8 x age in yrs).
      used 25 as age
      Subtracted 200 needed for caloric deficit
      Used moderately active modifier (1.55) in equation
    */
    var tdee = 0;
    tdee = Math.round((66 + (13.7 * (currUser.currentWeight/2.2) + (5 * currUser.height) -(6.8 * 25))) * 1.55 - 200);
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
      <div id="bg-img" style={{ 
      backgroundImage: `url("https://www.troiafoods.com/wp-content/uploads/2022/11/237A3124-1-scaled-1.jpeg")`
      }}>
      
      <div id="home-row" className="border rounded" color="white">
        <h1>Welcome To Your EZ Calorie Profile</h1>
      </div>
      <Container>
        <Row id="home-row" color="white" className="justify-content-md-left h-100 border rounded-3">
          {/* Left column of homepage display */}
          <Col xs lg="6">
            <h2>{currUser.displayName}</h2>
            <Col className="d-flex align-items-end justify-content-center" style={{ height: "200px" }}>
            <h4>{message}</h4>
            
            </Col>
          <h3 className="mt-5">See who's following you!</h3>
          {/* Map through users that follow the current user */}
          {followers.map((f) => (
            <Follower key = {f.id} follower={f} />
          ))}
          {/* Map through users followed by the current user */}
          <h3>Users you are following:</h3>
          {following.map((f) => (
            <Following key = {f.id} following={f} />
          ))}
          
          <Link to={"/followForm"}>
            <Button className="mt-4" id="post-save-btn" size="lg">
              Follow Someone New!
            </Button></Link>
            <br></br>
            <Link to="/editPersonal" state={{currUser: currUser}}>
              <Button size="lg" className="mt-5" id="post-save-btn">Edit Personal Details</Button>
            </Link>
          </Col>
          {/* Right column of homepage display */}
          <Col className="" xs lg="6"><h2>Tracking Your Progress</h2>
          {displayCaloriesNeeded()}
            <Row className="border rounded-top mt-5 p-2">
              <h4>Net Calories Today: {netCalories}</h4>
              <Col>
              <Col className="d-flex align-items-end justify-content-center" >Your Current Weight!
              </Col>
              {currUser.currentWeight}
              </Col>
              <Col>
              <Col className="d-flex align-items-end justify-content-center">Your Goal Weight! 
              </Col>
              {currUser.goalWeight}</Col>
              <Link to="/editWeights" state={{currUser: currUser}}>
                <Button id="post-save-btn">Edit Weights</Button>
              </Link>
            </Row>
            <Row className="justify-content-md-left  square border">
              <Col>
                <h2>Your Meals Today</h2>
                <Row>
                  {meals.map((m) => (
                    <Meal key={m.id} meal={m} />
                    
                  ))}
                 
                  
                </Row>
                
                <br></br>
                <Link to="/addMeal">
                  <Button size="lg" id="add-button">Add Meal</Button>
                </Link>
                <h4 className="mt-2">Total Calories Consumed: {totalCaloriesConsumed}</h4>
                
              </Col>
              
            </Row>
            <Row className="justify-content-md-left">
              <Col>
                <h2>Your Exercises Today</h2>
                <Row>
                  {exercises.map((e) => (
                    <Exercise key={e.id} exercise={e} />
                    
                  ))}
                  
                </Row>
                <Link to={"/exerciseForm"}>
                  <Button size="lg" className="mt-2 mb-2"id="add-button">Add Exercise</Button>
                </Link>
                <br></br>
                <h4>Total Calories Burned: {totalCaloriesBurned}</h4>
              </Col>
            </Row>
            
          </Col>

        </Row>
        <Row>

        </Row>

        
      </Container>

    </div>
  );
  
}