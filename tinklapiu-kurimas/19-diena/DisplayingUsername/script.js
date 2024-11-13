"use strict";
async function displayUserName(userId) {
  try {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    let user = await response.json();
    console.log(user);
    document.getElementById("user-info").innerHTML = `${user.name}`;
  } catch (e) {
    console.error(e.message);
  }
}
displayUserName(1);
displayUserName(999);
