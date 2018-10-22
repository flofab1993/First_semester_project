function saveInput() { // Save Input in local storage
  
  // Save answers to variables
  var nat = document.forms["input"]["country"].value;
  var cph = document.forms["input"]["district"].value;
  var gen = null;
  var rel = null;
  var eye = null;
  var veg = null;
  var bow = null;
  var pet = null;
  var pop = null;
  var toc = null;

  var radios = document.getElementsByTagName("input");

  for(let i = 0; i < radios.lenght; i++) {
    if(radios[i].type == "radio" && radios[i].checked) {
      radios[i] = document.querySelector('input[name=radios[i].name]:checked').value
    }
  }

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

  if (nat!=="" && // Check if everything is filled out
      gen!==null && 
      rel!==null && 
      cph!=="" && 
      eye!==null && 
      veg!==null && 
      bow!==null && 
      pet!==null && 
      pop!==null && 
      toc!==null) {

        var id = gen + (new Date()).getTime(); // Create id for user based on gender + time in milliseconds from 01/01/1970
    
        localStorage.setItem(id, JSON.stringify(user)); // Store user object as string with JSON

  } else { // Message if value is missing
    
    alert("Please fill out the complete form!")
  }
}

function resetAnswers() { //Resets the radio buttons
  
  var answer = document.getElementsByName("gender");
  
  for(var i=0;i<answer.length;i++) {
      answer[i].checked = false;
  }

}