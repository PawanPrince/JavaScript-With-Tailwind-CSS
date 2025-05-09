const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginbtn = document.querySelector("#loginbtn");

loginbtn.addEventListener("click", async (e) => {
e.preventDefault();
const loginuser = {
    email: email.value,
    password: password.value,
};

console.log(loginuser);

let resp = await fetch("http://localhost:3001/users");
let allusers = await resp.json();
console.log(allusers);

let authuser = allusers.find((ele) =>{
     return ele.email.toLowerCase() === loginuser.email.toLowerCase() &&
         ele.password.toLowerCase() === loginuser.password.toLowerCase()
});

console.log(authuser);

if(authuser) {
    alert("Login Successful");
    
    localStorage.setItem("authuserid", authuser.id);
    window.location.replace("http://127.0.0.1:5500/src/pages/profile/profile.html");
}else {
    alert("Login Failed");
    window .location.replace("http://127.0.0.1:5500/src/pages/signup/signup.html");
}


})