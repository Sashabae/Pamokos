// Write a JavaScript function to hide email addresses to protect from unauthorized user.

function protect_email(email) {
  const [username, gmailcom] = email.split("@");
  const protectedUsername = username.substring(0, 5) + "...";
  return `${protectedUsername}@${gmailcom}`;
}

// Test Data :
console.log(protect_email("robin_singh@example.com"));
// "robin...@example.com"
