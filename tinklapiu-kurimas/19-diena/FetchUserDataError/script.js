"use strict";

async function fetchUserData(userId) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    let user = await response.json();
    console.log(user);
  } catch (e) {
    if (e.name === "NetworkError") {
      console.error("Network error occured");
    } else {
      console.error(e.message);
    }
  }
}

fetchUserData(1);
fetchUserData(999);
