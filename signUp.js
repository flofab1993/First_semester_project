function signUp() { // New user registration

  // Create Users array, if it does not exist already
  if(localStorage.getItem("Users") === null) {
    localStorage.setItem("Users", JSON.stringify([])); // Creates empty array named "Users"
  }

  // Read user input
  let username = document.getElementById("newUser").value;
  let password = document.getElementById("newPassword").value;
  let confirmPw = document.getElementById("confirmPassword").value;

  var emailValid = /\w{4}1\d\w{2}@student.cbs.dk/; // Regular expression for a CBS mail adress no older than from 2010
  var userArr = JSON.parse(localStorage.getItem("Users")) // Array containing login data of every user as an object

  // Check if user already exists
  let userOk = true 

  for (let i=0; i<userArr.length; i++) {
    if (userArr[i].username === username) {
      userOk = false; // If username exists, userOk becomes false (Basically: user is not ok)
      break; // Break out of the loop
    }
  }
  
  // Validate Input
  
  if (!emailValid.test(username)) { // Check if username is a CBS mail adress
    alert("Username must be a CBS email adress!");
    return false;
  } else if (!userOk) { // Check if user already exists
    alert("User already exists!");
    return false;
  } else if (password != confirmPw) { // Check if password confirmation matches
    alert("Your passwords don't match!");
    return false;
  } else { 
    userArr.push({ // Push an object with the user's username and password to userArr
      username: username,
      password: password
    })
    localStorage.setItem("Users", JSON.stringify(userArr)) // Load the new userArr into the local storage
    alert("You have been successfully registered. You will now be redirected to the login page")
  }
}
