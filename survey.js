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

  for (let i =0; i<userArr.length; i++) {
    if (userArr[i].username === username) {
      userOk = false; // If username exists, userOk becomes false (Basically: user is not ok)
      break; // Break out of the loop
    }
  }

  // Validate Input
  if(!emailValid.test(username)) { // Check if username is a CBS mail adress
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

function signIn() { // Login function
  
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

  for (let i=0; i<takenArr.length; i++) {
    if(takenArr[i] === loginName) {
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

// Count number of students that have taken the survey
document.getElementById("userCounter").innerHTML = "We have asked " + localStorage.length + " E-Business students.";

function saveInput() { // Save Input upon submit

  // Make sure everyone only takes the survey once
  if (localStorage.getItem("Survey taken") === null) {
    localStorage.setItem("Survey taken", JSON.stringify([])) // If array doesn't exist yet, create one
  }

  // Post the username to the list (array) of users that have already taken the survey
  var takenArr = JSON.parse(localStorage.getItem("Survey taken")); // Get the exisiting array

  takenArr.push(sessionStorage.getItem("Active user")); // Push the active user to the array

  localStorage.setItem("Survey taken", JSON.stringify(takenArr)) // Put the array back into the local storage

  localStorage.removeItem("Active user"); // Remove the active user from the session storage

  // Calculate Age
  // Get the values for day, month and year
  var birthDay = document.getElementById("day").value;
  var birthMonth = document.getElementById("month").value;
  var birthYear = document.getElementById("year").value;

  // Make sure date is valid (e.g. exclude 31st for some months)
  var thirtyDayMonths = ["02","04","06","09","11"];
  if(birthDay === "31" && thirtyDayMonths.includes(birthMonth) || (birthDay === "30" && birthMonth === "02")){
    alert("Invalid birthday!");
    return false; // Alert when date is invalid and stay at form
  }

  // Create a date object from a datestring (YYYY-MM-DD)
  var birthDate = new Date(birthYear + "-" + birthMonth + "-" + birthDay)

  var ageDiff = Date.now() - birthDate.getTime(); // Difference in milliseconds between today and the date of birth
  var ageDate = new Date(ageDiff); // date after ageDiff milliseconds from 01/01/1970

  var age = Math.abs(ageDate.getUTCFullYear() - 1970); // The year of ageDate - 1970 gives us the exact age

  // Save answers to variables
  var nat = document.getElementById("country").value; 
  var cph = document.getElementById("district").value;
  var gen = document.querySelector('input[name=gender]:checked').value;
  var rel = document.querySelector('input[name=relationship]:checked').value;
  var eye = document.querySelector('input[name=eye_color]:checked').value;
  var veg = document.querySelector('input[name=food]:checked').value;
  var bow = document.querySelector('input[name=drinks]:checked').value;
  var pet = document.querySelector('input[name=pet]:checked').value;
  var pop = document.querySelector('input[name=pizzaPasta]:checked').value;
  var toc = document.querySelector('input[name=hotdrinks]:checked').value;

  var user = { // Create an object named user from input 
    age: age,
    nationality: nat,
    gender: gen,
    status: rel,
    district: cph,
    eye_color: eye,
    eating: veg,
    drinks: bow,
    pet: pet,
    food: pop,
    hotDrink: toc,
  }

  var id = gen + (new Date()).getTime(); // Create id for user based on gender + time in milliseconds from 01/01/1970

  localStorage.setItem(id, JSON.stringify(user)); // Store user object as string with JSON
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Class to draw charts with up to 5 values
class Chart {

    constructor(name, id) {
        this.name = name; // name of property in result object
        this.id = id; // id of chart div in html file
    }

    drawPieChart() {
        let valueArr = []; 

        for (let i = 0; i < localStorage.length; i++) { // valueArr gets filled with the answers the subjects gave
            if (localStorage.key(i) != "Users" && localStorage.key(i) != "Survey taken") {
                let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
                valueArr.push(usr[this.name]);
            }
        }

        // Create object listing the number of times each answer possibility occurs
        var numberOfValue = {};

        valueArr.forEach(function(n) {  // Creates a property for each answer possibility with its amount as the value
            numberOfValue[n] = (numberOfValue[n] || 0) + 1; 
        });

        // 2-Dimensional array with each answer possibility and their number of occurence
        var rankedValues = [];
        
        for(let x in numberOfValue){
            rankedValues.push([x, numberOfValue[x]]) // x is the name of the answer
        }

        rankedValues.sort(function(a,b){ // Sort array descending by the amount an answer occurs
            return b[1] - a[1];
        }); 

        // We just want to display the top 5 recurring answers in the dataset, therefore we will further adjust
        var otherValues = 0; // This will become the number of answers given that were not part of the top 5

        for(let i=5; i<rankedValues.length; i++) { // Start from 5 and loop through rankedValues and add values to otherValues
            otherValues += rankedValues[i][1]; // We only want elements from the second column, which are the number of occurences
        }
  
        // Adjusting rankedValues to go into pie chart
        rankedValues.splice(4,rankedValues.length-5); // Remove every element but the first five
        rankedValues.unshift(['Name','Number']) // Add labels
        rankedValues.push(['Other',otherValues]); // Add total of other answers
    
        var data = google.visualization.arrayToDataTable(rankedValues); // Make pie chart

        var options = {
            
        };
    
        var chart = new google.visualization.PieChart(document.getElementById(this.id)); // Reference to pie chart in .html file
        chart.draw(data, options);   
    }

    drawBarChart() {
        let valueArr = []

        for (let i=0; i<localStorage.length; i++) {
            if (localStorage.key(i) != "Users" && localStorage.key(i) != "Survey taken") {
                var usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
                valueArr.push(usr[this.name]);
            }
        }

        var numberOfValue = {};

        valueArr.forEach(function(n) {  
            numberOfValue[n] = (numberOfValue[n] || 0) + 1; 
        });

        var rankedValues = []; 

        for(let x in numberOfValue){
            rankedValues.push([x, numberOfValue[x]])
        }

        rankedValues.sort(function(a,b){
            return b[1] - a[1];
        });

        rankedValues.unshift(['Name','Number']) // Add labels, as required by Google Charts

        var data = google.visualization.arrayToDataTable(rankedValues); // Make pie chart

        var options = {
        };
    
        var chart = new google.visualization.BarChart(document.getElementById(this.id)); // Reference to bar chart in .html file
        chart.draw(data, options);
    }
}
// Create instances of the Chart class to build Pie Charts
var genders    = new Chart('gender','genderChart');
var countries  = new Chart('nationality','countryChart');
var districts  = new Chart('district','cphChart');
var relStatus  = new Chart('status','statusChart');
var eyeColor   = new Chart('eye_color','eyeChart');
var veggie     = new Chart('eating','veggieChart');
var beerWine   = new Chart('drinks','drinksChart');
var dogCat     = new Chart('pet','petChart');
var pizzaPasta = new Chart('food','pizzaChart');
var coffeeTea  = new Chart('hotDrink','coffeeChart');

// Function to load in callback with google's API
function drawChart() {
    genders.drawPieChart();
    countries.drawPieChart();
    relStatus.drawPieChart();
    eyeColor.drawPieChart();
    veggie.drawPieChart();
    beerWine.drawPieChart();
    dogCat.drawPieChart();
    pizzaPasta.drawPieChart();
    coffeeTea.drawPieChart();
    districts.drawBarChart()
}

// Display average age
var ageArr = [];

for (let i=0; i<localStorage.length; i++) {
  let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
  if (Number.isInteger(usr.age)) { // Add age to ageArr only if value is an integer
    ageArr.push(usr.age);
  }
}

// Get sum of all ages
var ageSum = 0
for(let i=0; i<ageArr.length; i++) {
  ageSum += ageArr[i];
}

// Calculate average age
var averageAge = ageSum/ageArr.length

// Display in HTML with the average Age rounded to two decimals
document.getElementById("avgAge").innerHTML = "The average age of your fellow students is " + Math.round(averageAge * 100)/100 + " years"
