import express from 'express';

import { Book } from '../models/bookModel.js';

const router=express.Router()


//Route to save a new book
router.post('/',async(req,res)=>{
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

router.get('/',async(req,res)=>{
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
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure that the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    res.status(500).json({ message: error.message });
  }
});

//Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure that the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    res.status(500).json({ message: error.message });
  }
});

//Update a book
router.put("/:id",async(req,res)=>{
    try{
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
          return res.status(400).send({
            message:
              "User needs to define all required fields (title,body,publishedYear)",
          });
        }

        const {id}=req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message:'Book not found'})
        }

        return res.status(200).json({message:'Book updated sucessfully'})

    }
    catch(error){
        console.log(`An error occured:${error}`)
        res.status(500).json({message:error.message})
    }
})

export { router as bookRoutes };
