var mysql = require("mysql");

this.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "demo"
});

create =()=>{

    var name = "roh44it";
    var email = "Rohitman0045@gmail.com";
    var password ="hitman0045";

    this.sql = "INSERT INTO employees (name,email,password)";
    this.sql += "VALUES ('"+name+"','"+email+"','"+password+"')";

    this.con.connect(function(err){
        if(err){
            console.log(err);
        }

        console.log("connect!");
    });

   this.con.query(this.sql,function(err,result){
        if(err){
            console.log(err);
        }

        console.log(result);
    });
  
}

create();