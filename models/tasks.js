const Database = require("../models/Database");

class Task {
    id = 0;
    userid = "";
    tdate = "";
    ttime = "";
    ttask = "";
    status ="";
    query = ""
  
    db = new Database.Database();

    constructor() {
        this.id = 0;
        this.userid = 0;
        this.tdate = "";
        this.ttime = "";
        this.ttask = "";
        this.status ="";
      
    }


         save = () => {
        if (this.id == 0) {

            this.query = "INSERT INTO tasks (userid,tdate,ttime,task,status) ";
            this.query += " VALUES ('" + this.userid + "','" + this.tdate + "','" + this.ttime + "','" + this.ttask + "','open')";
        }
        else {

            this.query = "UPDATE tasks SET  userid='" + this.userid + "', tdate='" + this.tdate + "' , ttime = '" + this.ttime + "', task = '" + this.ttask + "' ";
            this.query += " WHERE id =" + this.id ;
        }

        console.log(this.query);
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err){
                    return reject(err) };
                resolve(result);
            });
        });

        }

        delete = ()=>{

            this.query = "DELETE FROM tasks ";
            this.query += " WHERE id = '"+ this.id + "' ";                
            return new Promise((resolve, reject)=>{
                this.db.query(this.query, (err, result)=>{
                    this.db.close();
                    if(err)
                        reject(err);                
                    resolve(result);
                });
            });         
        }


        upstatus=()=>{
            this.query = "UPDATE tasks SET status ='"+this.status+"' ";
            this.query += " WHERE id = '"+ this.id + "' ";                
            return new Promise((resolve, reject)=>{
                this.db.query(this.query, (err, result)=>{
                    this.db.close();
                    if(err)
                        reject(err);                
                    resolve(result);
                });
            });  

        }


        select=()=>{
            this.query = "SELECT * FROM tasks ";
            this.query += " WHERE userid = '"+ this.userid + "' ";                
            return new Promise((resolve, reject)=>{
                this.db.query(this.query, (err, result)=>{
                    this.db.close();
                    if(err)
                        reject(err);                
                    resolve(result);
                });
            });  

        }


        list_all = ()=>{
            this.query = "SELECT * FROM tasks "; 
            this.query += " WHERE id = '"+ this.id + "' ";
            return new Promise((resolve, reject)=>{
                this.db.query(this.query, (err, result)=>{
                    this.db.close();
                    if(err)
                        reject(err);                
                    resolve(result);
                });
            });
        }

    
        

}


module.exports = {

    Task: Task

}