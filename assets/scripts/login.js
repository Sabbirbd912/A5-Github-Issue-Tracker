
function loginHandler(){
    const userInput=document.getElementById("user-input").value;
    const userPassward=document.getElementById("user-pass").value;
    
    if(userInput==="admin" && userPassward==="admin123"){

        alert("Successful Login");
        window.location.assign("home.html");
    }else{
        alert("Invalid Username or Password!");
    }

}
