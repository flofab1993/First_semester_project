// Initialize array with users, if it doesn't exist yet
if(localStorage.getItem("Users") === null) {
    localStorage.setItem("Users", JSON.stringify([]));
}

// Initialize array with users that have taken the survey, if it doesn't exist yet
if (localStorage.getItem("Survey taken") === null) {
    localStorage.setItem("Survey taken", JSON.stringify([])) 
}

// Register new User
function register() {
    let newUser = new User (
      document.getElementById("newUsername").value,
      document.getElementById("newEmail").value,
      document.getElementById("newPassword").value
    )
  
    return newUser.signUp();
  }
  
// Log in
function logIn() {
  let returningUser = new User (
    document.getElementById("loginName").value,
    document.getElementById("loginName").value,
    document.getElementById("loginPassword").value
  )

  return returningUser.signIn();
}