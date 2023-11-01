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
const auth = getAuth();

var Array_Excel, Database_array, arr, name_data

const get_database=()=>{
    const dbref=ref(db);
    get(child(dbref,"Attendance/")).then((snapshot)=>{
      if(snapshot.exists()){
         arr = snapshot.val()
    get(child(dbref,"Name/")).then((snapshot)=>{
        if(snapshot.exists()){
            name_data=snapshot.val()
        var lenth=Object.keys(arr).length
        Database_array=new Array
        for(let i=0; i<lenth; i++){
          var key= Object.keys(arr)[i]
          var value=arr[key]
            Database_array.push({
               date: value["date"],
               name: value["name"],
               sign: value["sign"],
               position: i
                })

    }
    Database_array.forEach(element => createElement(element))
}
})
}
})
.catch((error)=>{
    console.log(error)
})
}

window.onload=()=>get_database()

const createElement=(value)=>{
    const body= document.getElementById("data-subbody")

    var container=document.createElement("div")
    var subContainer1=document.createElement("div")
    var subContainer2=document.createElement("div")
    var name=document.createElement("p")
    var date=document.createElement("p")
    var sign=document.createElement("p")

    container.className="data-container"
    subContainer1.className="data-subcontainer-1"
    subContainer2.className="data-subcontainer-2"
    name.className="service-name"
    date.className="service-date"
    sign.className="service-count"

    name.innerText=value["name"]
    date.innerText=value["date"]
    sign.innerText=value["sign"]

    container.addEventListener("click", ()=>{
        window.location="Attendance-Data.html?position="+value["position"]
    })

    subContainer1.appendChild(name)
    subContainer1.appendChild(date)
    subContainer2.appendChild(sign)
    container.appendChild(subContainer1)
    container.appendChild(subContainer2)
    body.appendChild(container)
}


document.getElementById("attendance-list").addEventListener("click",()=>{
    window.location="menu.html"
})

document.getElementById("export").addEventListener("click",()=>exportDataExcel(Array_Excel))



function exportDataExcel(){
    var lenth=Object.keys(arr).length
    for(let i=0; i<lenth; i++){
     var Array_Excel=new Array
      var key= Object.keys(arr)[i]
      var value=arr[key]
      var name_length=Object.keys(name_data).length
      var total= parseInt(value["total"])
      for(let a=0; a<total; a++){
        var b= a+1
        if(value["a-code-"+b]!==""){
      for(let n=0; n<name_length; n++){
        var name_key= Object.keys(name_data)[n]
        var name_value=name_data[name_key]
        if(value["a-code-"+b]===name_value["code"]){
            Array_Excel.push({
                ['S/N']:name_value["code"],
                Name: name_value["name"],
                Ministry: (name_value["ministry"]!=="")?name_value["ministry"]:"-",
                Arms: (name_value["arms"]!=="")?name_value["arms"]:"-",
                ["Arrival-time"]: value["a-time-"+b]
                  })
        }
      }
      
    }
}
console.log(XLSX)
 /* File Name */
 var filename = value["date"]+".xlsx";
         
 /* Sheet Name */
 var ws_name = value["date"];
 
 var wb = XLSX.utils.book_new(),
   ws = XLSX.utils.json_to_sheet(Array_Excel);
 
 /* Add worksheet to workbook */
 XLSX.utils.book_append_sheet(wb, ws, ws_name);
 
 /* Write workbook and Download */
XLSX.writeFile(wb, filename);
}
}


document.getElementById("Search-data").addEventListener("input", ()=>{
    document.getElementById("data-subbody").innerHTML=""
    const SearchValue=document.getElementById("Search-data").value
    if(SearchValue!==""){
        var SearchArray= Database_array.filter((value)=>{
            return  value["date"].toLowerCase().includes(SearchValue.toLowerCase())|| value["name"].toLowerCase().includes(SearchValue.toLowerCase())
        })
        SearchArray.forEach(element => createElement(element))
    }else{
        Database_array.forEach(element => createElement(element))
    }
})
