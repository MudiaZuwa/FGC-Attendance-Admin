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

import{getDatabase, ref, set, get, child, push}
from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

import { getAuth,} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const db= getDatabase();
const postListRef = ref(db, 'Name');
const newPostRef = push(postListRef);

var  date, first, middle, last, address, phone, month, arms, ministry, fulldate


document.getElementById("data-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    Ready()
    if(arms!=="Arms"&&ministry!=="Minisrty"){
        enable_elements(true)
        const auth = getAuth();
    const dbref=ref(db);
      get(child(dbref,"Name/")).then((snapshot)=>{
        if(snapshot.exists()){
          var arr = snapshot.val()
          var lenth=Object.keys(arr).length-1
            var key= Object.keys(arr)[lenth]
            var value=arr[key]
            var code=parseInt(value["code"])+1
            set(newPostRef, {
                address:address,
                arms:arms,
                code:code.toString(),
                date:`${(date!=="Date")?date:""}`,
                first:first,
                key:newPostRef.key,
                last:last,
                middle:middle,
                ministry:ministry,
                month:(month!=="Month")?month:"",
                name:first.concat(" ", (middle!=="")?middle:"", " ", last),
                phone:phone
              })
              .then(()=>{
                document.getElementById("first").value= ""
                document.getElementById("middle").value= ""
                document.getElementById("last").value= ""
                document.getElementById("address").value= ""
                document.getElementById("phone").value= ""
                document.getElementById("date").value= ""
               document.getElementById("ministry").value= "Ministry"
               document.getElementById("arms").value= "Arms"
                enable_elements(false)
              })
              .catch((error)=>{
              console.log(error)
              enable_elements(false)
              }) 
      }
      })
      .catch((error)=>{
          console.log(error)
          enable_elements(false)
      })
    }
})

function Ready(){
   first= document.getElementById("first").value
   middle= document.getElementById("middle").value
   last= document.getElementById("last").value
   address= document.getElementById("address").value
   phone= document.getElementById("phone").value
   fulldate= document.getElementById("date").value
   ministry= document.getElementById("ministry").value
   arms= document.getElementById("arms").value

   getDate_Month(fulldate)
}

function enable_elements(check){
    document.getElementById("first").disabled=check
    document.getElementById("middle").disabled=check
    document.getElementById("last").disabled=check
    document.getElementById("address").disabled=check
    document.getElementById("phone").disabled=check
    document.getElementById("date").disabled=check
    document.getElementById("ministry").disabled=check
    document.getElementById("arms").disabled=check
    document.getElementById("submit").disabled=check
    if(check){
      document.getElementById('loader').style.display="block"
   }
   else{
      document.getElementById('loader').style.display="none"
   }
}

function getDate_Month(fulldate){
    var Dateobj=new Date(fulldate)
    var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    date=Dateobj.getDate()
    month=months[Dateobj.getMonth()]
}


document.getElementById("back-page").addEventListener("click",()=>{
  window.location="menu.html"
})
