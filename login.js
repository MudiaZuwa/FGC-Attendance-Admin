import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyC_b5gP3Y3kNaC674yFoUQ0wwXm21oQ2Lg",
    authDomain: "mudialoom.firebaseapp.com",
    databaseURL: "https://mudialoom.firebaseio.com",
    projectId: "mudialoom",
    storageBucket: "mudialoom.appspot.com",
    messagingSenderId: "396838948295",
    appId: "1:396838948295:web:5017ad30b78f747164dde2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import{getDatabase, ref, set, get, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const db= getDatabase();


document.getElementById("login-body").addEventListener("submit", (e)=>{
  e.preventDefault();
    const dbref=ref(db);
    enable_elements(true)
    get(child(dbref,"password/")).then((snapshot)=>{
      if(snapshot.exists()){
          var password_input=document.getElementById("password").value
        var arr = snapshot.val()
        var lenth=Object.keys(arr).length
        for(let i=lenth-1; i>=0; i--){
          var key= Object.keys(arr)[i]
          var value=arr[key]
            if(password_input===value["Admin"]){
              signIn() 
              return
            }
            
        }
        alert("Incorrect Password")
        enable_elements(false)
    }
    })
    .catch((error)=>{
        alert(error)
        enable_elements(false)
    })
})

function signIn(){
    const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    window.location="menu.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
    alert(errorMessage)
    enable_elements(false)
  });
}

function enable_elements(check){
  document.getElementById("password").disabled=check
  document.getElementById("submit").disabled=check
  if(check){
    document.getElementById('loader').style.display="block"
 }
 else{
    document.getElementById('loader').style.display="none"
 }
}

var toogle=document.getElementById("toggle")
toogle.onclick=()=>{
    var x = document.getElementById("password");
if (x.type === "password") {
  x.type = "text";
  toogle.src="Icons/ic_visibility_black.png"
} else {
  x.type = "password";
  toogle.src="Icons/ic_visibility_off_black.png"
}
}