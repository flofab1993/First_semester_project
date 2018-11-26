if (localStorage.getItem("Survey taken") === null) {
  localStorage.setItem("Survey taken", JSON.stringify([])) // If array doesn't exist yet, create one
}

class Result {
  constructor(age, nationality, gender, status, district, eye_color, eating, drinks, pet, food, hotDrink) {
    this.age = age,
    this.nationality = nationality, // Nationality
    this.gender = gender, // Gender
    this.status = status, // Relationship status
    this.district = district, // District
    this.eye_color = eye_color, // Eye color
    this.eating = eating, // Eating (Vegetarian, Vegan or none)
    this.drinks = drinks, // Beer or Wine
    this.pet = pet, // Dog or cat
    this.food = food, // Pizza or Pasta
    this.hotDrink = hotDrink  // Tea or coffee
  }
}

function saveInput() { // Save Input upon submit

  // Make sure everyone only takes the survey once
  var takenArr = JSON.parse(localStorage.getItem("Survey taken"));

  // This makes sure that you can not go back from the pie charts and take the survey again
  for (let i=0; i<takenArr.length; i++) {
    if (sessionStorage.getItem("Active user") === takenArr[i]) { // If the active user has taken the survey...
      alert("You can not take the survey twice!") 
      window.open("pie_charts.html", "_self")
      return false;
    }
  }

  // Post the username to the list (array) of users that have already taken the survey
  takenArr.push(sessionStorage.getItem("Active user")); // Push the active user to the array

  localStorage.setItem("Survey taken", JSON.stringify(takenArr)) // Put the array back into the local storage

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

  var result = new Result(
    age,
    document.getElementById("country").value,
    document.querySelector('input[name=gender]:checked').value,
    document.querySelector('input[name=relationship]:checked').value,
    document.getElementById("district").value,
    document.querySelector('input[name=eye_color]:checked').value,
    document.querySelector('input[name=food]:checked').value,
    document.querySelector('input[name=drinks]:checked').value,
    document.querySelector('input[name=pet]:checked').value,
    document.querySelector('input[name=pizzaPasta]:checked').value,
    document.querySelector('input[name=hotdrinks]:checked').value
    ) 
  
  // Save results in local storage
  // If no results have been saved yet, create new empty array
  if (localStorage.getItem("Results") === null) {
    localStorage.setItem("Results", JSON.stringify([]));
  }
  
  // Push the result in an array and save it in local storage
  var resultArr = JSON.parse(localStorage.getItem("Results"));
  resultArr.push(result);
  localStorage.setItem("Results",JSON.stringify(resultArr));
}