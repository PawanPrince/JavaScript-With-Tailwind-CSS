console.log('Signup page loaded');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupbtn = document.getElementById('signupbtn');

// console.log(usernameInput);

signupbtn.addEventListener('click', async (e) => {
    e.preventDefault();  //stops page refreshing
    console.log("Form subitted");
    console.log(usernameInput.value);
    console.log(emailInput.value);
    console.log(passwordInput.value);
    

    let newSugnupUser = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    console.log(newSugnupUser);
    
    let payload = JSON.stringify(newSugnupUser)
    console.log(payload);
try{
    let response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: payload,
    });
    
    console.log(response);
    alert("User created successfully");
    
     
}catch (error) {
    console.log("Error:");
    alert("Error creating user. Please try again.");
}
    
});
    
