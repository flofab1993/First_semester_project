class User {
  constructor(username,password) {
    this.username = username,
    this.password = password,
    this.userArr = JSON.parse(localStorage.getItem("Users"));
    this.emailValid = /\w{4}1\d\w{2}@student.cbs.dk/,
    this.pwValid = /(?=.{6,})(?=.*[A-Z])(?=.*[0-9])/
  }

  signUp() {
    let userOk = true;

    for (let i=0; i<this.userArr.length; i++) {
      if (this.userArr[i].username === this.username) {
        userOk = false; // If username exists, userOk becomes false (Basically: user is not ok)
        break; // Break out of the loop
      }
    }
      
    // Validate Input
    if (!this.emailValid.test(this.username)) { // Check if username is a CBS mail adress
      alert("Username must be a CBS email adress!");
      return false;
    } else if (!userOk) { // Check if user already exists
      alert("User already exists!");
      return false;
    } else if (!this.pwValid.test(this.password)) {
      alert("Your password must be at least 6 characters long and must contain at least one uppercase letter and a number.");
      return false
    } else if (this.password != document.getElementById("confirmPassword").value) { // Check if password confirmation matches
      alert("Your passwords don't match!");
      return false;
    } else { 
      userArr.push({ // Push an object with the user's username and password to userArr
        username: this.username,
        password: window.btoa(this.password)
      })
      localStorage.setItem("Users", JSON.stringify(this.userArr)) // Load the new userArr into the local storage
      alert("You have been successfully registered. You will now be redirected to the login page")
    }
  }

  signIn() {
    let usernameOK = false 
    let passwordOK = false

    for (let i=0; i<this.userArr.length; i++) {
      if (this.userArr[i].username === this.username && window.atob(this.userArr[i].password) === this.password) { // If a user object exists in local storage, where both username and password match with input
        usernameOK = true;
        passwordOK = true;
        sessionStorage.setItem("Active user",this.username) // To check later, whether the user has already taken the survey, we will temporarily store his name in the session storage
        break;
      } else if (this.userArr[i].username === this.username) { // If only the username matches
        usernameOK = true;
      }
    }

    if (!usernameOK) { // If the username does not exist, this message will be shown
      alert("User does not exist!");
      return false;
    } else if (!passwordOK) { // If only the username was ok, this message will be shown
      alert("Wrong password!")
      return false;
    }

    // Redirecting condition: If the user has already taken the survey, login leads directly to the pie charts
    // If not, he gets to the survey
    let takenArr = JSON.parse(localStorage.getItem("Survey taken"))
    let userIsNew = true

    if(takenArr != null) {
      for (let i=0; i<takenArr.length; i++) {
        if(takenArr[i] === this.username) {
          userIsNew = false;
          break;
        }
      }
    }

    // If the user has not taken the survey yet (user is new) he will be redirected to the survey
    if(userIsNew) {
      window.open('survey.html',"_self"); // "_self" makes the html page replace the current page
    } else {
      window.open('pie_charts.html',"_self");
    }
  }
}
