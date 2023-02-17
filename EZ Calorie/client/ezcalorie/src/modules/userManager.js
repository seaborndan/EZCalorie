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

export const editPersonalDetails = (id, oldName, newDispName, oldHeight, newHeight) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/personalEdit?id=${id}&oldName=${oldName}&newDisplayName=${newDispName}&oldHeight=${oldHeight}&newHeight=${newHeight}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      })
  })
}

export const editUserCurrentWeight = (id, oldWeight, newWeight) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/currWeightEdit?id=${id}&oldWeight=${oldWeight}&newWeight=${newWeight}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
  })
}

export const editUserGoalWeight = (id, oldGoal, newGoal) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/currGoalEdit?id=${id}&oldGoal=${oldGoal}&newGoal=${newGoal}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
  })
}

export const addUserGoalWeight = (id, newGoal) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/addGoalWeight?id=${id}&newGoal=${newGoal}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
  })
}

export const getFollowList = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/followList`, {
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

export const getFollowers = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/followers`, {
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

export const getFollowing = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/following`, {
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


/* 
  Function for making http request to api to follow a given user based on their id
*/
export const Follow = (followingId) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/followUser?followingId=${followingId}`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
  })
}

/* 
  Function for making http request to api for unfollowing a user based on their id
*/
export const Unfollow = (followingId) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/unfollow?id=${followingId}`, {
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