import express from "express"
import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { dirname } from "path";
import {connectDB} from "./connectDB.js"
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const port=process.env.PORT;
const uri=process.env.MONGODB_URI;


const app=express()


app.get("/",(req,res)=>{
    return res.status(234).send("Welcome to this project")
})

//Route to save a new book
app.post('/books',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author ||!req.body.publishedYear){
            return res.status(400).send({
                message:'Send all required fields',
                
            })
        }
    }
    catch(error){
        console.log(`An error occured:${error}`)
        res.status(500).send({message:error.message})
    }
})

connectDB(uri)


app.listen(port,()=>{
    console.log(`Port in ${port}`)
})