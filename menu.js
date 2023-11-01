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

var Array_Excel, Database_array

const get_database=()=>{
const auth = getAuth();
  const dbref=ref(db);
    get(child(dbref,"Name/")).then((snapshot)=>{
      if(snapshot.exists()){
        var arr = snapshot.val()
        var lenth=Object.keys(arr).length
        Array_Excel=new Array
        Database_array=new Array
        for(let i=0; i<lenth; i++){
          var key= Object.keys(arr)[i]
          var value=arr[key]
          Array_Excel.push({
            address: value["address"],
            arms: value["arms"],
            date: value["date"],
            first: value["first"],
            last: value["last"],
            middle: value["middle"],
            ministry: value["ministry"],
            month: value["month"],
            name: value["name"],
            phone: value["phone"]
            })
            Database_array.push({
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
    Database_array.forEach(element => createElement(element))
}
})
.catch((error)=>{
    console.log(error)
})
}

window.onload=()=>get_database()


const createElement=(value)=>{
    const container= document.getElementById("data-subbody")

    var dropdown=document.createElement("div")
    var dataitem=document.createElement("div")
    var data_name=document.createElement("p")
    var data_code=document.createElement("p")
    var view=document.createElement("p")
    var hr=document.createElement("hr")

    var dropdown_content=document.createElement("div")
    var data_icon=document.createElement("img")
    var data_editIcon= document.createElement("img")
    
    var title_array=["Full Name:", "First Name:", "Middle Name:", "Last Name:", "Address:", "Phone Number:", "Date of Birth:", "Ministry:", "Arms:"]
    var data_array=[
    value["name"], value["first"], value["middle"],
     value["last"], value["address"], value["phone"],
      value["date"].concat((value["date"]==="1")?"st":(value["date"]==="2")?"nd":(value["date"]==="3")?rd:"th", " ", value["month"]),
       value["ministry"], value["arms"]
    ]
    dropdown.className="dropdown"
    dataitem.className="data-item"
    data_name.className="data-name"
    data_code.className="data-code"
    view.className="view"

    dropdown_content.className="dropdown-content"
    data_icon.className="data-icon"
    data_editIcon.className="data-edit"


    data_name.innerText=value["name"]
    data_code.innerText=value["code"]
    view.innerText="View More"

    data_icon.src="Icons/defaul_2.png"
    data_editIcon.src="Icons/user-pen-solid.svg"
    dropdown_content.style.display="none"

    data_editIcon.addEventListener("click", ()=>{
        window.location="Edit.html?code="+value["code"]
    })

    view.addEventListener("click",()=>{
        if(dropdown_content.style.display==="block"){
            dropdown_content.style.display="none"
            return
        }
        if(dropdown_content.style.display="none"){
        dropdown_content.style.display="block"
        return
    }
      
    })
    
    dataitem.appendChild(data_code)
    dataitem.appendChild(data_name)
    dataitem.appendChild(view)

    dropdown_content.appendChild(data_editIcon)
    dropdown_content.appendChild(data_icon)
    
    for(let i=0; i<title_array.length; i++){
    var float=document.createElement("div")
    var data=document.createElement("p")
    var title=document.createElement("p")

    float.className="float"
    data.className="data"
    title.className="data-title"

    data.innerText=data_array[i]
    title.innerText= title_array[i]

    float.appendChild(title)
    float.appendChild(data)
    dropdown_content.appendChild(float)
    }

    dropdown.appendChild(dataitem)
    dropdown.appendChild(dropdown_content)
    dropdown.appendChild(hr)
    container.appendChild(dropdown)
}


document.getElementById("attendance-list").addEventListener("click",()=>{
    window.location="Attendance-list.html"
})

document.getElementById("export").addEventListener("click",()=>exportDataExcel(Array_Excel))


document.getElementById("add-database").addEventListener("click",()=>{
    window.location="Upload.html"
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


document.getElementById("Search-data").addEventListener("input", ()=>{
    document.getElementById("data-subbody").innerHTML=""
    const SearchValue=document.getElementById("Search-data").value
    if(SearchValue!==""){
        var SearchArray= Database_array.filter((value)=>{
            return value["code"]===SearchValue|| value["name"].toLowerCase().includes(SearchValue.toLowerCase())
        })
        SearchArray.forEach(element => createElement(element))
    }else{
        Database_array.forEach(element => createElement(element))
    }
})
