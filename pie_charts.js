google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

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

// Count number of students that have taken the survey
document.getElementById("userCounter").innerHTML = "We have asked " + results.length + " E-Business students.";

// Display average age
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

let commentString = "";
for (let i=commentArr.length - 1; i >= 0; i--) {
    var comment = new Comment (commentArr[i].author, commentArr[i].text, commentArr[i].date)
    commentString += comment.stringifyComment();
}
document.getElementById("commentSection").innerHTML = commentString;


function postComment() {
    if (sessionStorage.getItem("Active user") === null) { // If no one is logged in, redirect to login page
        alert("You mus be logged in to write a comment!")
        window.open("signIn.html","_self")
    } else {
        activeUser.writeComment(document.getElementById("comment").value);
        commentArr = JSON.parse(localStorage.getItem("Comments"));

        commentString = "";
        for (let i=commentArr.length - 1; i >= 0; i--) {
            var comment = new Comment (commentArr[i].author, commentArr[i].text, commentArr[i].date)
            commentString += comment.stringifyComment();
        }
        document.getElementById("commentSection").innerHTML = commentString;
    }
}