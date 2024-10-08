const Note = require('../model/Notes')

//create note

const createNote = async (req,res) => {
    try {
     const {title,content} = req.body
     const saveNote = new Note({title,content,author:req.userId})
     await saveNote.save()

    res.redirect('/dashboard')
        
    } catch (Error) {
        console.log(Error)
        res.status(500).json({
            message:Error
        })
    }
}

//get all notes of users

const getNotes = async (req,res) => {
    //find all notes
    try {
    const notes = await Note.find({author:req.userId})
    res.status(201).json(notes)
    } catch (error) {
      res.status(500).json({
        message:"Something wrong on server"+error
      })  
    }
}

//get single note using noteId

const getSingleNote = async (req,res) => {
    try {
        const noteId = req.params.noteId
        const note = await Note.findById(noteId)
        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({
            message:"Something wrong on server"
        })
    }
}

const deleteNote = async (req,res) => {
    try {
        const noteId = req.params.noteId
        const deleteNote = await Note.findByIdAndDelete(noteId) 
        res.redirect('/dashboard')
    } catch (error) {
        res.redirect(`/dashboard`)
    }
}

const updateNote = async (req,res) => {
    try {
     const noteId = req.params.noteId
     const updateNote = await Note.findByIdAndUpdate(noteId,req.body)
     if(!updateNote){
        res.redirect(`/dashboard`)
     }
     res.redirect(`/dashboard`)
    } catch (error) {
        res.redirect(`/dashboard`)
    }

}

module.exports = {createNote,getNotes,getSingleNote,updateNote,deleteNote}

