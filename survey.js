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