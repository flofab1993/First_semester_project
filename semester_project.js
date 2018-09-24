var attempt = 3; // Variable to count number of attempts.
var errorAttempt = 0;

submit.onclick = function(){

    // Below function Executes on click of login button.

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(attempt);
    console.log(errorAttempt);

    if(errorAttempt >= attempt){
        alert("You are fucked");
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;    
        return false;
    }

    if ( username == "flo" && password == "bremen"){
        alert ("Login successfully");
        window.location.href = "http://transfermarkt.de"; // Redirecting to other page.
        return false;
    }else{
        errorAttempt++;
        alert("You have "+ attempt +" attempts left");
    }
}