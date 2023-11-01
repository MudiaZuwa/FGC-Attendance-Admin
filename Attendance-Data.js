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

var Array_Excel, Database_array, arr, name_data,ws_name

const get_database=()=>{
    var params=new URLSearchParams(window.location.search)
    var position=params.get("position")
    const dbref=ref(db);
    get(child(dbref,"Attendance/")).then((snapshot)=>{
      if(snapshot.exists()){
         arr = snapshot.val()
    get(child(dbref,"Name/")).then((snapshot)=>{
        if(snapshot.exists()){
            name_data=snapshot.val()
            var key= Object.keys(arr)[position]
            var value=arr[key]
            var name_length=Object.keys(name_data).length
            var total= parseInt(value["total"])
            ws_name= value["date"]
            Database_array=new Array
            Array_Excel=new Array
            for(let a=0; a<total; a++){
              var b= a+1
              if(value["a-code-"+b]!==""){
            for(let n=0; n<name_length; n++){
              var name_key= Object.keys(name_data)[n]
              var name_value=name_data[name_key]
              if(value["a-code-"+b]===name_value["code"]){
                Database_array.push({
                    arms: (name_value["arms"]!=="")?name_value["arms"]:"-",
                    code:name_value["code"],
                    ministry:  (name_value["ministry"]!=="")?name_value["ministry"]:"-",
                    name: name_value["name"],
                    time: value["a-time-"+b]
                      })
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
    const body= document.getElementById("data-table")

    var row= document.createElement("tr")
    var serialNo= document.createElement("td")
    var name= document.createElement("td")
    var ministry= document.createElement("td")
    var arm= document.createElement("td")
    var time= document.createElement("td")

    serialNo.innerText=value["code"]
    name.innerText=value["name"]
    ministry.innerText= value["ministry"]
    arm.innerText= value["arms"]
    time.innerText= value["time"]

    row.appendChild(serialNo)
    row.appendChild(name)
    row.appendChild(ministry)
    row.appendChild(arm)
    row.appendChild(time)
    body.appendChild(row)

}

const CreateTableHead=()=>{
    const body= document.getElementById("data-table")

    var row= document.createElement("tr")
    var serialNo= document.createElement("th")
    var name= document.createElement("th")
    var ministry= document.createElement("th")
    var arm= document.createElement("th")
    var time= document.createElement("th")

    serialNo.innerText="S/N"
    name.innerText="Name"
    ministry.innerText= "Ministry"
    arm.innerText= "Arms"
    time.innerText= "Arrival Time"

    row.appendChild(serialNo)
    row.appendChild(name)
    row.appendChild(ministry)
    row.appendChild(arm)
    row.appendChild(time)
    body.appendChild(row)
}


document.getElementById("attendance-list").addEventListener("click",()=>{
    window.location="menu.html"
})

document.getElementById("export").addEventListener("click",()=>exportDataExcel(Array_Excel))



function exportDataExcel(createXLSLFormatObj){
    /* File Name */
    var filename = ws_name+".xlsx";
  
    
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(createXLSLFormatObj);
    
    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    
    /* Write workbook and Download */
    XLSX.writeFile(wb, filename);
    
    }


document.getElementById("Search-data").addEventListener("input", ()=>{
    document.getElementById("data-table").innerHTML=""
    CreateTableHead()
    const SearchValue=document.getElementById("Search-data").value
    if(SearchValue!==""){
        var SearchArray= Database_array.filter((value)=>{
            return value["code"]===SearchValue|| value["ministry"].toLowerCase().includes(SearchValue.toLowerCase())|| value["name"].toLowerCase().includes(SearchValue.toLowerCase())|| value["arms"].toLowerCase().includes(SearchValue.toLowerCase())
        })
        SearchArray.forEach(element => createElement(element))
    }else{
        Database_array.forEach(element => createElement(element))
    }
})
