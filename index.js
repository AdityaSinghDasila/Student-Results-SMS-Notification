import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import {fileURLToPath} from "url";
import {dirname} from "path";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express(); 

//dbase connection
const db = new pg.Client({
    user: 'postgres',
    password: 'aditya',
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'DB_resultSMS'
}) 
db.connect();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const __dirname=dirname(fileURLToPath(import.meta.url));

app.get("/",(req,res)=>{
   try{
    res.render("login.ejs",{});
   }catch(error){
    console.log(error.message);
   }
});
app.post("/submit",async (req,res)=>{
    try{
        let qry="select username from teachers WHERE password = $1";
        const result = await db.query(qry,[req.body["password"]])
        if(result.rows.length>0)
        {
            console.log("the credentials were correct")
            res.render("home.ejs",{
                name:req.body["username"],
            });
        }
        else{
            res.render("login.ejs",{
                msg:"Username or Password did not match",
            });
        }
        }catch(error){
        console.log(error.message);
    }
});

//inserting the form in the database
app.post("/marks",async (req,res)=>{
    try{
        let qry="INSERT INTO result(id,name,english,hindi,maths,science,phN) VALUES($1,$2,$3,$4,$5,$6,$7)";
        const result= await db.query(qry,[req.body["id"],req.body["name"],req.body["english"],req.body["hindi"],req.body["maths"],req.body["science"],req.body["phN"]]);
        if(result){
            console.log("updation successfull");
        }
        else{
            console.log("There was a problem in insertion to DB");
        }
    }catch(error){
        console.log(error.message);
    }
})




app.get("/sms",(req,res)=>{
//also create logic to dislplay the table of the result, by sending it with the ejs file
    console.log("sms route was hit");
    try{
        res.render("SMSpage.ejs",{});
    }catch(error){
        console.log(error.message);
    }
});


app.listen(port,()=>{
    console.log("the server is running on port: "+port);
})
