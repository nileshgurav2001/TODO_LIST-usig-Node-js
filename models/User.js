const Database = require("../models/Database");

class User{
    id=0;
    name="";
    email="";
    password="";
    query = "";
    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.name = "";
        this.email = "";
        this.password = "";
    }

    register(){

        this.query = "INSERT INTO users (name,email,password) ";
        this.query += "VALUES ('" + this.name+"','"+ this.email+ "','" + this.password  + "')";
        // this.query += "VALUES ('" + this.name.replace(/'/g, "''") +"','"+ this.email.replace(/'/g, "''") + "','" + this.password.replace(/'/g, "''") + "')"
        //console.log(this.query);
        return new Promise((resolve,rejects)=>{

            // console.log(this.query);
            this.db.query(this.query,(err,result)=>{
                  this.db.close();
                   if(err){
                       return rejects(err);
                   }
                   resolve(result);
              console.log(result);
            });
        });
    }

    login(){
        this.query = "SELECT id, name, email FROM users ";
        this.query += "WHERE email = '" + this.email.replace(/'/g, "''") + "' AND password = '" + this.password.replace(/'/g, "''") + "'";
        // console.log(this.query);
        return new Promise((resolve,rejects)=>{
            this.db.query(this.query,(err,result)=>{
                  this.db.close();
                   if(err){
                       return rejects(err);
                   }
                   resolve(result);
                   console.log(result);     
            });
        });
    }

}

module.exports = {

 User:User

}