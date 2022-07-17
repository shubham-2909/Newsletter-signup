const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req,res) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  var data = {
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: fName,
        LNAME: lName
      }
    }]
  }
 
  var jsonData = JSON.stringify(data);

  var options = {
    url:" https://us14.api.mailchimp.com/3.0/lists/f4be9ab40b",
    method:"POST",
    body: jsonData,
    headers:{
      "Authorization":"Shuhbam1 ac24374acdfb495f245d117e5e3c912d-us14"
    }
  }

  request(options,function (error,response,body) {
        if(error){
          res.sendFile(__dirname + "/failure.html");
          console.log(error);
        }else{
          if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
          }else{
            res.sendFile(__dirname + "/failure.html");
            console.log(response.statusCode);
          }
        }
  })

});

app.post("/failure",function (req,res) {
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function () {
    console.log("Server is created at port 3000");
})


//d6413a2568603bb1e7935e6d4f09f664-us14
//f4be9ab40b