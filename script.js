// Function to generate a random access token (16-byte string)
function generateAccessToken() {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 16;
  let accessToken = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    accessToken += char.charAt(randomIndex);
  }
  return accessToken;
}

// Function to handle the signup process
function handleSignup(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const showMessage = document.getElementById("error-message");
  // Perform validation on input fields (e.g., check for empty fields)
  if (!username || !email || !password || !confirmPassword) {
    showMessage.innerHTML = "Error : All fields are mandatory.";
    return;
  }

  if (password !== confirmPassword) {
    showMessage.innerHTML = "";
    showMessage.innerHTML = "Error : Passwords do not match.";
    return;
  }

  // Store user details in local storage
  const accessToken = generateAccessToken();
  const userDetails = {
    username,
    email,
    password,
    accessToken,
  };
  localStorage.setItem("user", JSON.stringify(userDetails));

  // Display success message
  showMessage.innerHTML = "";

  showMessage.classList.remove("error");
  showMessage.classList.add("success");
  showMessage.innerHTML = "Success : Signup successful! Redirecting to profile page...";

  // Redirect to the profile page after a delay
  setTimeout(() => {
    window.location.href = "profile.html";
  }, 2000);
}

// Check if the user is logged in
function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    return;
  }
  if (user && user.accessToken) {
    // If there is no access token, redirect to the signup page
    window.location.href = "profile.html";
  } else {
    window.location.href = "index.html";
  }
}

// Event listeners
document.getElementById("signup-form").addEventListener("click", handleSignup);
// document.getElementById("logout").addEventListener("click", handleLogout);

// Check login status on page load
checkLoginStatus();
