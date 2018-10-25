function saveInput() { // Save Input in local storage
  
  // Save answers to variables
  var nat = document.forms["input"]["country"].value;
  var cph = document.forms["input"]["district"].value;
  var gen = document.querySelector('input[name=gender]:checked').value;
  var rel = document.querySelector('input[name=relationship]:checked').value;
  var eye = document.querySelector('input[name=eye_color]:checked').value;
  var veg = document.querySelector('input[name=food]:checked').value;
  var bow = document.querySelector('input[name=drinks]:checked').value;
  var pet = document.querySelector('input[name=pet]:checked').value;
  var pop = document.querySelector('input[name=pizzaPasta]:checked').value;
  var toc = document.querySelector('input[name=hotdrinks]:checked').value;

  var user = { // Create an object named user from input 
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

function resetAnswers() { //Resets the radio buttons
  
  var radios = document.getElementsByTagName("input");

  for(var i=0; i<radios.length; i++) {
      if(radios[i].type == "radio") {
        radios[i].checked = false;
      }
  }
}

// Load Google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawCountryChart);
google.charts.setOnLoadCallback(drawGenderChart);
google.charts.setOnLoadCallback(drawStatusChart);
google.charts.setOnLoadCallback(drawCPHChart);
google.charts.setOnLoadCallback(drawVeggieChart);
google.charts.setOnLoadCallback(drawDrinksChart);
google.charts.setOnLoadCallback(drawEyeChart);
google.charts.setOnLoadCallback(drawPetChart);
google.charts.setOnLoadCallback(drawPizzaChart);
google.charts.setOnLoadCallback(drawCoffeeChart);

// Nationality chart
function drawCountryChart() {

    // Create array containing the value for nationality from each user
    let countryArr = [];

    for(let i = 0; i < localStorage.length; i++) {
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
    }).unshift(["Country", "Number"]); // Add labels

    var data = google.visualization.arrayToDataTable(rankedCntrs); // Make pie chart of nationalities with the array rankedCntrs

    var options = { // Pie chart title
        title: 'This is where your fellow students are from:'
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('countryChart')); // Reference to pie chart in .html file
    chart.draw(data, options);
}

// Gender chart
function drawGenderChart() {
    
    // Create array with all values for gender
    var genderArr = [];

    for(let i=0; i<localStorage.length; i++){
    let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    genderArr.push(usr.gender);
    }

    // The number of times each gender occurs
    var nrFemales = 0;
    var nrMales = 0;

    for(let i=0; i<genderArr.length; i++){

    if(genderArr[i] == "female") {
        nrFemales++;
    }else if(genderArr[i] == "male") {
        nrMales++;
    }
    }

    var data = google.visualization.arrayToDataTable([
    ['Gender', 'Number'],
    ['Female', nrFemales],
    ['Male', nrMales]
    ]);

    var options = {
    title: 'This is the gender ratio of your year:'
    };

    var chart = new google.visualization.PieChart(document.getElementById('genderChart'));

    chart.draw(data, options);
}

// Relationship status chart

function drawStatusChart() {

    var statusArr = [];

    for(let i=0; i<localStorage.length; i++) {
        let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        statusArr.push(usr.status);
    }

    var nrSingle = 0;
    var nrTaken = 0;
    var nrMarried = 0;

    for(let i=0; i<statusArr.length; i++) {
        if (statusArr[i]=='single') {
            nrSingle++;
        } else if (statusArr[i]=='taken') {
            nrTaken++;
        } else if (statusArr[i]=='married') {
            nrMarried++;
        }
    }

    var data = google.visualization.arrayToDataTable([
        ['Status', 'Number'],
        ['Single', nrSingle],
        ['In a Relationship', nrTaken],
        ['Married', nrMarried]
    ]);

    var options = {
        title: 'This is the relationship status of people in your year:'
        };
    
        var chart = new google.visualization.PieChart(document.getElementById('statusChart'));
    
        chart.draw(data, options);
}

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
  
  var chart = new google.visualization.PieChart(document.getElementById('cphChart')); // Reference to pie chart in .html file
  chart.draw(data, options);
}

// Chart for eye colors

function drawEyeChart() {
  
  var eyeclrArr = [];

  for(let i = 0; i<localStorage.length; i++) {
    let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    eyeclrArr.push(usr.eye_color);
  }
  var nrBrown = 0;
  var nrBlue = 0;
  var nrGreen = 0;
  var nrGrey = 0;
  var nrOther = 0;

  for(let i=0; i<eyeclrArr.length; i++) {
    switch(eyeclrArr[i]) {
      case 'brown':
        nrBrown++;
        break;
      case 'blue':
        nrBlue++;
        break;
      case 'green':
        nrGreen++;
        break;
      case 'grey':
        nrGrey++;
        break;
      case 'other':
        nrOther++;
        break;
    }
  }

  var data = google.visualization.arrayToDataTable([
    ['Name', 'Color'],
    ['Brown', nrBrown],
    ['Blue', nrBlue],
    ['Green', nrGreen],
    ['Grey', nrGrey],
    ['Other', nrOther]
  ])

  var options = {
    title: 'What eye color do your fellow students have?'
  };

  var chart = new google.visualization.PieChart(document.getElementById('eyeChart'));
  chart.draw(data, options);
  
}
// Chart for eating habits
function drawVeggieChart() {
  var veggieArr = [];

  for(let i=0; i<localStorage.length; i++) {
    let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    veggieArr.push(usr.eating);
  }

  var nrNone = 0;
  var nrVegetarian = 0;
  var nrVegan = 0;

  for(let i=0; i<veggieArr.length; i++) {
    if (veggieArr[i]=='none') {
        nrNone++;
    } else if (veggieArr[i]=='vegetarian') {
        nrVegetarian++;
    } else if (veggieArr[i]=='vegan') {
        nrVegan++;
    }
  }

  var data = google.visualization.arrayToDataTable([
    ['Habit', 'Number'],
    ['None', nrNone],
    ['Vegetarian', nrVegetarian],
    ['Vegan', nrVegan]
  ]);

  var options = {
    title: 'Are your fellow students vegetarian or even vegan?'
    };

    var chart = new google.visualization.PieChart(document.getElementById('veggieChart'));
    chart.draw(data, options);
}

// Drinks chart
function drawDrinksChart() {
  var drinksArr = [];

  for(let i=0; i<localStorage.length; i++) {
      let usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
      drinksArr.push(usr.drinks);
  }

  var nrBeer = 0;
  var nrWine = 0;

  for(let i=0; i<drinksArr.length; i++) {
      if (drinksArr[i]=='beer') {
          nrBeer++;
      } else if (drinksArr[i]=='wine') {
          nrWine++;
      }
  }

  var data = google.visualization.arrayToDataTable([
      ['Drink', 'Number'],
      ['Beer', nrBeer],
      ['Wine', nrWine]
  ]);

  var options = {
      title: 'What do your fellow students drink?'
      };
  
      var chart = new google.visualization.PieChart(document.getElementById('drinksChart'));
      chart.draw(data, options);
}

// Dog or Cat chart
function drawPetChart() {

  var petArr = [];

  for(let i=0; i<localStorage.length; i++) {
    usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    petArr.push(usr.pet);
  }

var nrDog = 0;
var nrCat = 0;

for(let i=0; i<petArr.length; i++) {
  if(petArr[i] == 'dog') {
    nrDog++;
  } else if (petArr[i] == 'cat') {
    nrCat++;
  }
}

var data = google.visualization.arrayToDataTable([
  ['Pet', 'Number'],
  ['Dog', nrDog],
  ['Cat', nrCat]
]);

var options = {
  title: 'What pet do your fellow students prefer?'
  };

  var chart = new google.visualization.PieChart(document.getElementById('petChart'));
  chart.draw(data, options);
}

// Draw Pizza or Pasta chart
function drawPizzaChart() {

  var pizzaArr=[];

  for(let i=0; i<localStorage.length; i++) {
    usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    pizzaArr.push(usr.food);
  }

  var nrPizza = 0;
  var nrPasta = 0;

  for(let i=0; i < pizzaArr.length; i++) {
    if (pizzaArr[i] == 'pizza') {
      nrPizza++;
    } else if (pizzaArr[i] == 'pasta'){
      nrPasta++;
    }
  }

  var data = google.visualization.arrayToDataTable([
    ['Dish','Number'],
    ['Pizza', nrPizza],
    ['Pasta', nrPasta]
  ])

  var options = {
    title: 'Is your year more into pizza or pasta?'
  };

  var chart = new google.visualization.PieChart(document.getElementById('pizzaChart'));
  chart.draw(data,options);
}

// Draw Coffee or Tea chart
function drawCoffeeChart() {

  var coffeeArr=[];

  for(let i=0; i<localStorage.length; i++) {
    usr = JSON.parse(localStorage.getItem(localStorage.key(i)));
    coffeeArr.push(usr.hotDrink);
  }

  var nrCoffee = 0;
  var nrTea = 0;

  for(let i=0; i < coffeeArr.length; i++) {
    if (coffeeArr[i] == 'coffee') {
      nrCoffee++;
    } else if (coffeeArr[i] == 'tea'){
      nrTea++;
    }
  }

  var data = google.visualization.arrayToDataTable([
    ['Hot drink','Number'],
    ['Coffee', nrCoffee],
    ['Tea', nrTea]
  ])

  var options = {
    title: 'What gets you fellow students up in the morning?'
  };

  var chart = new google.visualization.PieChart(document.getElementById('coffeeChart'));
  chart.draw(data,options);
}