import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import {fileURLToPath} from "url";
import {dirname} from "path";

const port = 3000;
const app = express(); 

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const __dirname=dirname(fileURLToPath(import.meta.url));

app.get("/",(req,res)=>{
   try{
    res.sendFile(__dirname+"/views/home.html");
   }catch(error){
    console.log(error.message);
   }
})
app.listen(port,()=>{
    console.log("the server is running on port: "+port);
})
