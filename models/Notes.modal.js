const mongoose=require('mongoose')


const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()  
    }
})




const NotesModal=mongoose.model('note',notesSchema)
module.exports=NotesModal