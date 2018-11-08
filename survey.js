function signUp() { // New user registration
  
  // Read user input
  let username = document.getElementById("newUser").value;
  let password = document.getElementById("newPassword").value;
  let confirmPw = document.getElementById("confirmPassword").value;

  var emailValid = /\w{4}1\d\w{2}@student.cbs.dk/; // Regular expression for a CBS mail adress no older than from 2010

  // Validate Input
  if(!emailValid.test(username)) { // Check if username is a CBS mail adress
    alert("Username must be a CBS email adress!");
    return false;
  } else if (localStorage.getItem(username) != null) { // Check if user already exists
    alert("User already exists!");
    return false;
  } else if (password != confirmPw) { // Check if password confirmation matches
    alert("Your passwords don't match!");
    return false;
  } else {
    localStorage.setItem(username, password); // Add user to local storage
  }
}

function signIn() { // Login function
  
  // Read user input
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (localStorage.getItem(username) === null) { // Check if username exists
    alert("The user doesn't exist")
    return false;
  } else if (localStorage.getItem(username) != password) { // CHeck if username and password match
    alert("Wrong password!")
    return false;
  }
}

// Count number of students that have taken the survey
document.getElementById("userCounter").innerHTML = "We have asked " + localStorage.length + " E-Business students.";

function saveInput() { // Save Input in local storage

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
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawCountryChart);
google.charts.setOnLoadCallback(drawCPHChart);

// Class to draw charts with up to 5 values
class OrChoice {

  constructor(name, id, value1, value2, value3, value4, value5) {
    this.name = name;
    this.id = id;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  drawChart() {
    let valueArr = [];

      for (let i=0; i<localStorage.length; i++) {
        let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        valueArr.push(usr[this.name]);
      }

      let value1Nr = 0;
      let value2Nr = 0;
      let value3Nr = 0;
      let value4Nr = 0;
      let value5Nr = 0;

      for (let i=0; i<valueArr.length; i++) {

        switch (valueArr[i]) {
          case this.value1:
            value1Nr++
            break;
          case this.value2:
            value2Nr++
            break;
          case this.value3:
            value3Nr++
            break;
          case this.value4:
            value4Nr++
            break;
          case this.value5:
            value5Nr++
            break;
        }
      }

      var data = google.visualization.arrayToDataTable([
        [this.name, 'Number'],
        [this.value1, value1Nr],
        [this.value2, value2Nr],
        [this.value3, value3Nr],
        [this.value4, value4Nr],
        [this.value5, value5Nr]
      ])

      var options = {
          /* title: 'This is a pie chart:' */
      };

      var chart = new google.visualization.PieChart(document.getElementById(this.id));

      chart.draw(data, options);
  }
}

// Create instanceses of the OrClass to build Pie Charts
var genders    = new OrChoice('gender','genderChart','female','male');
var relStatus  = new OrChoice('status','statusChart','single','taken','married');
var eyeColor   = new OrChoice('eye_color','eyeChart','brown','blue','green','grey','Other');
var veggie     = new OrChoice('eating','veggieChart','none','vegetarian','vegan');
var beerWine   = new OrChoice('drinks','drinksChart','beer','wine');
var dogCat     = new OrChoice('pet','petChart','dog','cat');
var pizzaPasta = new OrChoice('food','pizzaChart','pizza','pasta');
var coffeeTea  = new OrChoice('hotDrink','coffeeChart','coffee','tea');

// Function to load in callback with google's API
function drawPieChart() {
    genders.drawChart();
    relStatus.drawChart();
    eyeColor.drawChart();
    veggie.drawChart();
    beerWine.drawChart();
    dogCat.drawChart();
    pizzaPasta.drawChart();
    coffeeTea.drawChart();
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

// Nationality chart
function drawCountryChart() {
  // Create array containing the value for nationality from each user
  let countryArr = [];

  for (let i = 0; i < localStorage.length; i++) {
    let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    countryArr.push(usr.nationality);
  }
  
  // Create object listing the number of times each country occurs
  var numberOfCountry = {};

  countryArr.forEach(function(n) {  // Creates a property for each country with its amount as the value
    numberOfCountry[n] = (numberOfCountry[n] || 0) + 1; 
  });

  var rankedCntrs = []; // Create 2-dimensional array from object numberOfCountry
  for(let x in numberOfCountry){
    rankedCntrs.push([x, numberOfCountry[x]])
  }

  rankedCntrs.sort(function(a,b){ // Sort array descending by the amount a country occurs
    return b[1] - a[1];
  }); 

  // We just want to display the top 5 recurring countries in the dataset, therefore we will further adjust rankedCntrs
  var otherCntrs = 0; // Empty variable for the total amount of countries outside the top five

  for(i=5; i<rankedCntrs.length; i++) { // Start from 5 and loop through rankedCntrs and add values to otherCntrs
    otherCntrs += rankedCntrs[i][1]; // We only want elements from the second column
  }
  
  // Adjusting rankedCntrs to go into pie chart
  rankedCntrs.splice(4,rankedCntrs.length-5); // Remove every element but the first five
  rankedCntrs.unshift(['Country','Number']) // Add labels
  rankedCntrs.push(['Other',otherCntrs]); // Add total of other countries
  
  var data = google.visualization.arrayToDataTable(rankedCntrs); // Make pie chart

  var options = { // Pie chart title
    title: 'This is where your fellow students are from:',
  };
  
  var chart = new google.visualization.PieChart(document.getElementById('countryChart')); // Reference to pie chart in .html file
  chart.draw(data, options);
}

// Draw charts for CPH districts
function drawCPHChart() {
  
  // Create array containing the district from each user
  let cphArr = [];

  for(let i = 0; i < localStorage.length; i++) {
    let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    cphArr.push(usr.district);
  }
  
  // Create object listing the number of times each district occurs
  var numberOfDistrict = {};

  cphArr.forEach(function(n) {  // Creates a property for each district with its amount as the value
    numberOfDistrict[n] = (numberOfDistrict[n] || 0) + 1; 
  });

  var rankedDstrcts = []; // Create 2-dimensional array from object numberOfDistricts
  for(let x in numberOfDistrict){
    rankedDstrcts.push([x, numberOfDistrict[x]])
  }

  rankedDstrcts.sort(function(a,b){ // Sort array descending by the amount a district occurs
    return b[1] - a[1];
  }).unshift(["District", "Number"]); // Add labels

  var data = google.visualization.arrayToDataTable(rankedDstrcts); // Make pie chart of nationalities with the array rankedCntrs

  var options = { // Pie chart title
    title: 'This is where your fellow students live:'
  };
  
  var chart = new google.visualization.BarChart(document.getElementById('cphChart')); // Reference to pie chart in .html file
  chart.draw(data, options);
}