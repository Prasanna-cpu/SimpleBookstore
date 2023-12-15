import mongoose from 'mongoose'

const BookSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required
        },
        publishedYear:{
            type:Number,
            required:true

        }
    },
    {
        timestamps:true,
    }
)


export const Book=mongoose.Model('Book',BookSchema)