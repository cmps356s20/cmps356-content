async function login(event) {
    event.preventDefault();

    const credentials = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };
    console.log("login.credentials", credentials);

    const url = "/api/login";

    try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        //If response if not ok then jump to the catch block
        if (!response.ok)
            throw response;

        const user = await response.json();
        console.log("Login user:", user);
        //store the user in the localStorage so it is available to other pages
        localStorage.user = JSON.stringify(user);
        //Redirect the user to the index page specified in the redirectTo property
        window.location = user.redirectTo;
    }
    catch(err) {
            console.log(err);
            let errMessage = err.statusText;
            if (err.status == 403) {
                errMessage = "Authentication failed. Email and/password invalid";
            }
            document.querySelector("#errMsg").innerHTML = errMessage;
    }
}