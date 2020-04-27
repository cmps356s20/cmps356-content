document.addEventListener("DOMContentLoaded", ()=> {
    //Show the logged in username on the menu
    const user = JSON.parse(localStorage.user);
    if (user != 'undefined') {
        document.querySelector("#username").innerHTML = user.name;
    }
});