function signIn() {
    // Read user input
    let loginName = document.getElementById("username").value;
    let loginPassword = document.getElementById("password").value;

    let userArr = JSON.parse(localStorage.getItem("Users")) // Get array with all users from local storage

    // Validate input
    let usernameOK = false 
    let passwordOK = false

    for (let i=0; i<userArr.length; i++) {
        if (userArr[i].username === loginName && userArr[i].password === loginPassword) { // If a user object exists in local storage, where both username and password match with input
            usernameOK = true;
            passwordOK = true;
            sessionStorage.setItem("Active user",loginName) // To check later, whether the user has already taken the survey, we will temporarily store his name in the session storage
            break;
        } else if (userArr[i].username === loginName) { // If only the username matches
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
            if(takenArr[i] === loginName) {
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
