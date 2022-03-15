var express = require('express');
var body_parser = require("body-parser");
var cookie_parser = require("cookie-parser");
var multer = require("multer");
const User = require('./models/User');
const Tasks = require("./models/tasks");
const { cookie } = require('express/lib/response');
// const { Task } = require('./models/tasks');

var app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/logintask", function(req, res) {
    res.sendFile(__dirname+"/pages/login.html");
    // res.redirect("/user");
});     


app.get("/registerform", function(req, res) {

    res.sendFile(__dirname+"/pages/registration.html");
    
    if(cookie.usertype =="user"){
      
        res.redirect("/logintask");
    }
    // res.end();
});  

app.post("/register", async (req, res) => {

     let body = req.body;
    let user = new User.User();
    user.id = 0;
    user.name = body.data.name;
    user.email = body.data.email;
    user.password = body.data.password;
    user.register().then(result => {
        let data = {
            "data": {
                'id': result.insertId,
                "status": "success",
                "data" :result
            }
        }

        res.end(JSON.stringify(data));
    },
        err => {
            // console.log(err);
            let data = {
                "data": {

                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
        });
});

                                                                              
app.post("/login", async (req, res) => {
    let body = req.body;
    let user = new User.User();
   user.email = body.data.email;
   user.password = body.data.password;
   user.login().then(result => {
        let data = {
            "status": "fail"
        };
        if(result.length > 0){
            data = {
                "status": "success",
                "data": result
            };
        }
       res.end(JSON.stringify(data));
   },
       err => {
           let data = {
               "data": {

                   "status": "fail"
               }
           };
           res.end(JSON.stringify(data));
       });
});


app.post("/savetask", async (req, res) => {
    let body = req.body;
    let tasks = new Tasks.Task();
    tasks.id = body.data.id;
    tasks.userid = body.data.userid;
    tasks.tdate = body.data.tdate;
    tasks.ttime = body.data.ttime;
    tasks.ttask = body.data.ttask;
    tasks.save().then(result => {
        console.log(result);
        let data = {
        "data": {
            "status": "success"
            // 'tdate': result.tdate,
          
        }
    }
    res.end(JSON.stringify(data));
   },
   err => {
       let data = {
           "data": {
               
               "status": "fail"
            }
        };
           res.end(JSON.stringify(data));
        });
    });


    app.post("/delete", async (req, res) => {
        let body = req.body;
        let tasks = new Tasks.Task();
        tasks.id = body.data.id;
        
   tasks.delete().then(result => {
       console.log(result);
       let data = {
        "data": {
            "status": "success",
            // 'tdate': result.tdate,
            "data": result
        }
    }
       res.end(JSON.stringify(data));
   },
   err => {
       let data = {
           "data": {

               "status": "fail"
            }
        };
        res.end(JSON.stringify(data));
    });
});


app.post("/statustask", async (req, res) => {
    let body = req.body;
    let tasks = new Tasks.Task();
    tasks.id = body.data.id;
    tasks.status = body.data.status;
    
   tasks.upstatus().then(result => {
       console.log(result);
    let data = {
        "data": {
            "status": "success",
            // 'tdate': result.tdate,
            // "data": result
        }
    }
    res.end(JSON.stringify(data));
},
err => {
    let data = {
        "data": {
            
            "status": "fail"
        }
    };
    res.end(JSON.stringify(data));
});
});


app.post("/selecttask", async (req, res) => {
    let body = req.body;
    console.log(body)
    let tasks = new Tasks.Task();
    tasks.userid = body.data.userid;
    
    tasks.select().then(result => {
        console.log(result);
        let data = {
            "data": {
                "status": "success",
            // 'tdate': result.tdate,
            "data": result
        }
    }
       res.end(JSON.stringify(data));
    },
    err => {
        let data = {
            "data": {

                   "status": "fail"
                }
            };
           res.end(JSON.stringify(data));
        });
    });


    app.post("/findList", async (req, res) => {
    let body = req.body;
    let tasks = new Tasks.Task();
    tasks.id = body.data.id;
  
    tasks.list_all().then(result => {
    console.log(result);
    let data = {
       
            "data": result,
            "status": "success"
            // 'tdate': result.tdate,
        
    }
    res.end(JSON.stringify(data));
},
err => {
           let data = {
               "data": {

                   "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
        });
    });
    
    app.get("/user",async (req,res)=>{
        res.sendFile(__dirname + "/todo.html");
    })
    
    app.listen(8081, function() {
        console.log("website is  started");
    });
    