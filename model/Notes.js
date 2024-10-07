const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})
const Note = mongoose.model('Note',NoteSchema)
module.exports = Note 