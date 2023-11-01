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


import { getAuth,} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

const db= getDatabase();
const dbref=ref(db);
const auth = getAuth();

var datakey, date, fulldate, first, middle, last, address, phone, month, arms, ministry

var DateObj=new Date

window.onload=()=>{
    var params=new URLSearchParams(window.location.search)
    var Usercode=params.get("code")
    get(child(dbref,"Name/")).then((snapshot)=>{
        if(snapshot.exists()){
          var arr = snapshot.val()
          var lenth=Object.keys(arr).length
          for(let i=0; i<lenth; i++){
            var key= Object.keys(arr)[i]
            var value=arr[key]
            var Searchcode=value["code"]
            if(Usercode===Searchcode){
                 document.getElementById("first").value= value["first"]
                document.getElementById("middle").value= value["middle"]
                 document.getElementById("last").value= value["last"]
                 document.getElementById("address").value= value["address"]
               document.getElementById("phone").value= value["phone"]
                document.getElementById("ministry").value= value["ministry"]
                document.getElementById("arms").value= value["arms"]
                get_dateValue(value['date'], value["month"])
                datakey= value["key"]
                return
            }

          }
            
      }
      })
      .catch((error)=>{
          console.log(error)
      })
}

document.getElementById("data-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    Ready()
    if(arms!=="Arms"&&ministry!=="Minisrty"){
        enable_elements(true)
    update(ref(db, "Name/"+datakey),{
        address:address,
        arms:arms,
        date:`${(date!=="Date")?date:""}`,
        first:first,
        last:last,
        middle:middle,
        ministry:ministry,
        month:(month!=="Month")?month:"",
        name:first.concat(" ", (middle!=="")?middle:"", " ", last),
        phone:phone
      })
      .then(()=>{
         window.location="menu.html"
        enable_elements(false)
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

 function get_dateValue(date, month){
    if (date!==""&&month!==""){
    var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var monthIndex=months.indexOf(month)+1   
    month= (monthIndex.toString.length===1)?"0"+monthIndex: monthIndex
        date=(date.length===1)?"0"+date: date

   document.getElementById("date").value=DateObj.getFullYear()+"-"+month+"-"+date
 }else{
    document.getElementById("date").value=""
 }
}


document.getElementById("back-page").addEventListener("click", ()=>{
    window.loaction="menu.html";
    
  })