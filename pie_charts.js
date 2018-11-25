google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart); 

// Initialize array with users, if it doesn't exist yet
if(localStorage.getItem("Users") === null) {
    localStorage.setItem("Users", JSON.stringify([]));
}

var results = JSON.parse(localStorage.getItem("Results")) // Get array with objects of results

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

// Count and display number of students that have taken the survey
document.getElementById("userCounter").innerHTML = "We have asked " + results.length + " E-Business students.";

// Display average age
var ageArr = [];

// Push each age to ageArr
for(let i=0; i<results.length; i++) {
    let ageValue = results[i]['age'];
    ageArr.push(ageValue);
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

// Comment section
// Initialize local storage spot for comments
if (localStorage.getItem("Comments") === null) {
    localStorage.setItem("Comments", JSON.stringify([]));
}

let commentArr = JSON.parse(localStorage.getItem("Comments"));
let activeUser = new User(sessionStorage.getItem("Active user"));

// Display comments in a readable way
function showComments() { 
    let commentBlock = "";

    // Loop through array with comment information and add their readable format to the comment block
    for (let i=commentArr.length - 1; i >= 0; i--) {
        var comment = new Comment (commentArr[i].author, commentArr[i].text, commentArr[i].time)
        commentBlock += comment.stringifyComment();
    }
    document.getElementById("commentSection").innerHTML = commentBlock;
}

function postComment() {
    if (sessionStorage.getItem("Active user") === null) { // If no one is logged in, redirect to login page
        alert("You must be logged in to write a comment!")
        window.open("signIn.html","_self")
    } else if (document.getElementById("comment").value === "") { // Alert if comment box is left empty
        alert("Write something more meaningful!");
    } else {
        activeUser.writeComment(document.getElementById("comment").value); // Instance of class User writes a comment
        commentArr = JSON.parse(localStorage.getItem("Comments")); // Update comment array
        showComments();
    }
}