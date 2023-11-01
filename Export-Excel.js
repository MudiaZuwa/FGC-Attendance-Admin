import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
import * as XLSX from './node_modules/xlsx/xlsx.mjs';

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

const db= getDatabase();

var JSON_Database= new Array

document.getElementById("Export").addEventListener("click", function(e){
  e.preventDefault
    const dbref=ref(db);
    get(child(dbref,"Name/")).then((snapshot)=>{
      if(snapshot.exists()){
        JSON_Database=new Array
        var arr = snapshot.val()
        var lenth=Object.keys(arr).length
        for(let i=lenth-1; i>=0; i--){
          var key= Object.keys(arr)[i]
          var value=arr[key]
            JSON_Database.push({
            address: value["address"],
            arms: value["arms"],
            code: value["code"],
            date: value["date"],
            first: value["first"],
            key: value["key"],
            last: value["last"],
            middle: value["middle"],
            ministry: value["ministry"],
            month: value["month"],
            name: value["name"],
            phone: value["phone"]
            })

        }
        exportDataExcel(JSON_Database)
    }
    })
    .catch((error)=>{
        console.log(error)
    })
})


function exportDataExcel(createXLSLFormatObj){
/* File Name */
var filename = "FreakyJSON_To_XLS.xlsx";

/* Sheet Name */
var ws_name = "FreakySheet";

var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(createXLSLFormatObj);

/* Add worksheet to workbook */
XLSX.utils.book_append_sheet(wb, ws, ws_name);

/* Write workbook and Download */
XLSX.writeFile(wb, filename);

}

document.getElementById("folder").addEventListener("change", function(event) {
  var output = document.querySelector("ul");
  var files = event.target.files;

  console.log(files)

  for (var i=0; i<files.length; i++) {
    var item = document.createElement("li");
    item.innerHTML = files[i].webkitRelativePath;
    output.appendChild(item);
  };
}, false);
