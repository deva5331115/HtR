const express=require('express');

const bodyParser=require('body-parser');

const app=express();
const cors=require('cors')
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended:true
}));
var XLSX = require("xlsx");
var workbook = XLSX.readFile("hall.xlsx");
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list); // getting as Sheet1

sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];
  //getting the complete sheet
  // console.log(worksheet);

  var headers = {};
  var data = [];
  for (z in worksheet) {
    if (z[0] === "!") continue;
    //parse out the column, row, and value
    var col = (z.substring(0, 1));
     //console.log(col);

    var row = (z.substring(1));
     //console.log(row);

    var value = (worksheet[z].v);
    // console.log(value);

    //store header names
    if (row == 1) {
      headers[col] = (value);
      //string = headers[col].join("");
      //console.log(headers[col]);

      // storing the header names
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value.toString();
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();
  console.log(data);
  //console.log(data);

  var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://0.0.0.0:27017";
        
        MongoClient.connect(url)
.then(
 function(db)
 {    
  var dbo = db.db("Dictionary");
 // var myobj = { empid: empid, name:name,dept:dept, salary:salary,designation:designation,mobile:mobile };

  //console.log("test "+myobj.empid)
  dbo.collection("Words").deleteMany({})
  
  dbo.collection("Words").insertMany((data))  
    .then(function(){
       console.log("Record Inserted..")  
    })
    .catch(function(err){
          console.log(err)
    })
   
    })
.catch(function(err){
    console.log(err)
})
       

});