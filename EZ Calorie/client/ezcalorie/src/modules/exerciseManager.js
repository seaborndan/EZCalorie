import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/exercise";

export const getAllExercises = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get posts.",
        );
      }
    });
  });
};

export const AddExercise = async (name, calories) => {
  const token = await getToken();
  const resp = await fetch(`${_apiUrl}/addExercise?name=${name}&calories=${calories}`, {
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


export const editExercise = (id, name, calories) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/editExercise?id=${id}&name=${name}&calories=${calories}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      })
  })
}

export const deleteExercise = (id) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/deleteExercise?id=${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
  })
}

export const getToken = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};