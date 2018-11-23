if(localStorage.getItem("Users") === null) {
    localStorage.setItem("Users", JSON.stringify([]));
  }

// Register new User
function register() {
    let newUser = new User (
      document.getElementById("newUser").value,
      document.getElementById("newPassword").value
    )
  
    return newUser.signUp();
  }
  
  // Log in
  function logIn() {
    let returningUser = new User (
      document.getElementById("loginName").value,
      document.getElementById("loginPassword").value
    )
  
    return returningUser.signIn();
  }