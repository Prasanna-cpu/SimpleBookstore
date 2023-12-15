import express from "express"
import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { dirname } from "path";
import {connectDB} from "./connectDB.js"
import path from "path";
import {Book} from './models/bookModel.js'
import https from 'https';


const agent = new https.Agent({
  minVersion: "TLSv1.2", // Specify the minimum required TLS version
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const port=process.env.PORT;
const uri=process.env.MONGODB_URI;


const app=express()


app.use(express.json())
app.get("/",(req,res)=>{
    return res.status(234).send("Welcome to this project")
})

//Route to save a new book
app.post('/books',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author ||!req.body.publishedYear){
            return res.status(400).send({
                message:'User needs to define all required fields (title,body,publishedYear)',

            })
        }

        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishedYear:req.body.publishedYear
        };
        const book=await Book.create(newBook);
        return res.status(201).send(book)

    }

    catch(error){
        console.log(`An error occured:${error}`)
        res.status(500).send({message:error.message})
    }
})

//Route to get all books in data

app.get('/books',async(req,res)=>{
    try{
        const allBooks=await Book.find({});
        return res.status(200).json({
            count:allBooks.length,
            data:allBooks
        })
    }
    catch(error){
        console.log(`An error occured:${error}`)
        res.status(500).send({message:error.message})
    
    }
})

//Get one book's ID

connectDB(uri)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});