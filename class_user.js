class User {
  constructor(username,email,password) {
    this.username = username,
    this.email = email,
    this.password = password,
    this.userArr = JSON.parse(localStorage.getItem("Users"));
    this.emailValid = /\w{4}1\d\w{2}@student.cbs.dk/,
    this.pwValid = /(?=.{6,})(?=.*[A-Z])(?=.*[0-9])/ 
  }

  signUp() {
    // Check whether username or email already exist
    for (let i=0; i<this.userArr.length; i++) {
      if (this.userArr[i].username === this.username) {
        alert("Username already exists")
        return false;
      } else if (this.userArr[i].email === this.email) {
        alert("User already exists!")
        return false;
      }
    }
      
    // Validate Input
    if (this.emailValid.test(this.email)) { // Check if username is a CBS mail adress
      alert("Username must be a CBS email adress!");
      return false;
    } else if (!this.pwValid.test(this.password)) { // Check if password fulfills requirements
      alert("Your password must be at least 6 characters long and must contain at least one uppercase letter and a number.");
      return false
    } else if (this.password != document.getElementById("confirmPassword").value) { // Check if password confirmation matches
      alert("Your passwords don't match!");
      return false;
    } else { 
      // Create new user:
      this.userArr.push(
        new User( 
          this.username,
          this.email,
          window.btoa(this.password) // Encrypt password
        )
      ) 
      localStorage.setItem("Users", JSON.stringify(this.userArr)) // Load the new userArr into the local storage
      alert("You have been successfully registered. You will now be redirected to the login page")
    }
  }

  signIn() {
    let usernameOK = false 
    let passwordOK = false

    // Allow user to either login with their username or email adress
    if (this.emailValid.test(this.username)) { // Get username from email address
      for(let i=0; i<this.userArr.length; i++) {
        if (this.userArr[i].email === this.username) {
          this.username = this.userArr[i].username;
          break;
        }
      }
    } else { // Get email address from username
      for(let i=0; i<this.userArr.length; i++) {
        if (this.userArr[i].username === this.username) {
          this.email = this.userArr[i].email;
        }
      }
    }

    // Check if the input matches a registered user
    for (let i=0; i<this.userArr.length; i++) {
      if ((this.userArr[i].username === this.username || this.userArr[i].email === this.email) && window.atob(this.userArr[i].password) === this.password) { // If a user object exists in local storage, where both username and password match with input
        usernameOK = true;
        passwordOK = true;
        sessionStorage.setItem("Active user",this.email) // To check later, whether the user has already taken the survey, we will temporarily store his username and email in the session storage
        break;
      } else if (this.userArr[i].username === this.username || this.userArr[i].email === this.email) { // If only the username matches
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

    for (let i=0; i<takenArr.length; i++) {
      if(takenArr[i] === this.email) {
        userIsNew = false;
        break;
      }
    }

    // If the user has not taken the survey yet (user is new) he will be redirected to the survey
    if(userIsNew) {
      window.open('survey.html',"_self"); // "_self" makes the html page replace the current page
    } else {
      window.open('pie_charts.html',"_self");
    }
  }

  writeComment(text) {
    let commentArr = JSON.parse(localStorage.getItem("Comments"))
    
    // Get time the comment was written
    let d = new Date();
    let time = d.getTime(); // returns the date in milliseconds since 01/01/1997

    // Get username
    for(let i=0; i<this.userArr.length; i++) {
      if(this.userArr[i].email === sessionStorage.getItem("Active user")) {
        var name = this.userArr[i].username
        this.username = this.userArr[i].username // Active user is only saved as email, therefore we want to change it to the username here
        break;
      }
    }
    
    commentArr.push(new Comment(name,text,time)) // Add new comment to comment array
    localStorage.setItem("Comments", JSON.stringify(commentArr))
  }
}
