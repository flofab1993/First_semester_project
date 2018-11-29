// Show comments upon loading th page
window.onload = showComments;

// If no user is logged in, the login page is opened
if (sessionStorage.getItem("Active user") === null) {
    window.open("signIn.html","_self");
} 

// Initialize array with users, if it doesn't exist yet
if(localStorage.getItem("Users") === null) {
    localStorage.setItem("Users", JSON.stringify([]));
}

var results = JSON.parse(localStorage.getItem("Results")) // Get array with objects of results

// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart); 

// Create instances of the Chart class to build Pie Charts
var genders    = new Category('gender','genderChart');
var countries  = new Category('nationality','countryChart');
var districts  = new Category('district','cphChart');
var relStatus  = new Category('status','statusChart');
var eyeColor   = new Category('eye_color','eyeChart');
var veggie     = new Category('eating','veggieChart');
var beerWine   = new Category('drinks','drinksChart');
var dogCat     = new Category('pet','petChart');
var pizzaPasta = new Category('food','pizzaChart');
var coffeeTea  = new Category('hotDrink','coffeeChart');
  
// Function to load in callback of Google Charts
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
// Push each age to ageArr
var ageArr = [];

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
var averageAge = Math.round((ageSum/ageArr.length) * 100)/100

// Display in HTML with the average Age rounded to two decimals
document.getElementById("avgAge").innerHTML = "The average age of your fellow students is " + averageAge + " years"

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
        var comment = new Comment(commentArr[i].author, commentArr[i].text, commentArr[i].time)
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

// Log out
document.getElementById("logout").addEventListener("click", activeUser.logOut);