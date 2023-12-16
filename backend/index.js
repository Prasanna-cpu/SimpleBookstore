import express from "express"
import dotenv from 'dotenv'
import { fileURLToPath } from "url";
import { dirname } from "path";
import {connectDB} from "./connectDB.js"
import path from "path";
import {bookRoutes} from './routes/bookRoutes.js'
import {Book} from './models/bookModel.js'
import https from 'https';
import mongoose from 'mongoose';
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

app.use('/books',bookRoutes);

connectDB(uri)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});