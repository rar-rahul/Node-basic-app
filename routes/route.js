const router = require('express').Router()
const {registerUser,loginUser} = require('../controller/userController')
const {createNote,getNotes,getSingleNote,updateNote,deleteNote} = require('../controller/noteController')
const auth = require('../middelware/auth')
//user registeration and login routes
router.post('/register', registerUser)
router.post('/login', loginUser)

//user notes routes
router.post('/createNote',auth, createNote)
router.get('/getNotes', auth, getNotes)
router.get('/note/:noteId',auth, getSingleNote)
router.put('/updatenote/:noteId',auth, updateNote)
router.delete('/note/:noteId',auth, deleteNote)



module.exports = router



