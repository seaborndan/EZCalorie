import firebase from "firebase/app";
import "firebase/auth";

const apiUrl = "/api/meal";

/* 
  Function for making http request to 3rd party api
  takes in user query and returns food object
*/
export const handleMeal = async (query) => {
  const resp = await fetch('https://api.api-ninjas.com/v1/nutrition?query=' + query, {
    method: "GET",
    headers: {
      'X-Api-Key': 'P8/uoceuPDIkkxe7MarlcA==LrzsCXxHRK8SRGIN'
    },
  });
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(
      "An unknown error occurred while trying to get meals.");
  }
}

/* 
  Function for making http request to api to edit a Meal object
  given an id identifier, new name, caloric value, and mealTypeId
  assigns these new values to the Meal object associated with the id
*/
export const editMeal = (id, name, calories, mealTypeId) => {
  return getToken().then(token => {
      return fetch(`${apiUrl}/editMeal?id=${id}&name=${name}&calories=${calories}&mealTypeId=${mealTypeId}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      })
  })
}

export const DeleteMeal = (id) => {
  return getToken().then(token => {
      return fetch(`${apiUrl}/deleteMeal?id=${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  })
}

/* 
  Function for making http request to api for adding a Meal object to the DB
  takes in a Meal object built in the AddMeal.js component
  sends request to api to add new Meal object with properties passed through http query
*/
export const UserMeal = async (meal, mealTypeId) => {
  const token = await getToken();
  const resp = await fetch(`${apiUrl}/addMeal?name=${meal.name}&calories=${meal.calories}&fatTotal=${meal.fat_total_g}&protein=${meal.protein_g}&carbs=${meal.carbohydrates_total_g}&mealTypeId=${mealTypeId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (resp.ok) {
    console.log("Post made successfully!");
    return resp.json();
  } else {
    throw new Error(
      "An error occurred while trying to add a post.");
  }
}


export const getAllMeals = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get meals.",
        );
      }
    });
  });
};

export const getToken = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};