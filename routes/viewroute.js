const router = require('express').Router()
const auth = require('../middelware/auth')
const Note = require('../model/Notes')

router.get('/',(req,res) => {
    res.render('index')
})

router.get('/login',(req,res) => {
    res.render('login')
})

router.get('/register',(req,res) => {
    res.render('register')
})
router.get('/success',(req,res) => {
    res.render('success')
})

router.get('/createNote', auth, async (req,res) => {
    res.render('noteForm')
})

router.get('/updateNote/:noteId', async (req,res) => {
   
    const notes = await Note.findOne({_id:req.params.noteId})
    console.log(notes)
    res.render('editNote')
})

router.get('/dashboard', auth, async (req,res) => {
    const notes = await Note.find({author:req.userId})
    res.render('dashboard',{notes:notes})
})


module.exports = router 