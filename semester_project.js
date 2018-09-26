var attempt = 1; // Variable to count number of attempts.
var errorAttempt = 3;

submit.onclick = function(){

    // Below function Executes on click of login button.

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(attempt);
    console.log(errorAttempt);


    if (username == "flo" && password == "bremen") { //Opens site with right combination
        alert ("Login successfully");
        window.location.href = "http://transfermarkt.de"; // Redirecting to other page.
        return false;

    } else if (errorAttempt - attempt == 1) { //Alert when only one attempt is left
        alert("You have " + (errorAttempt - attempt) + " attempt left");
        attempt++;

    } else { //Alert when more then one attempt is left
        alert("You have " + (errorAttempt - attempt) + " attempts left");
        attempt++;
    }

    if (attempt > errorAttempt) { //Shuts down after 3 wrong attempts
        alert("You are fucked");
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;    
        return false;
    }
}