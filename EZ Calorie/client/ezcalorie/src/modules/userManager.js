import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/user";


export const _getByEmail = (email) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/userDetails/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json()));
};

export const getToken = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};