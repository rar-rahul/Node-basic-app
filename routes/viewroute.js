const router = require('express').Router()
const auth = require('../middelware/auth')
const Note = require('../model/Notes')

router.get('/',(req,res) => {
    console.log(req.isAuth)
    res.render('index',{ isAuth: req.isAuth})
})

router.get('/login',(req,res) => {
    res.render('login',{ isAuth: req.isAuth,error:''})
})

router.get('/register',(req,res) => {
    res.render('register',{ isAuth: req.isAuth,error:''})
})
router.get('/success',(req,res) => {
    res.render('success',{isAuth: req.isAuth})
})

router.get('/createNote', auth, async (req,res) => {
    res.render('noteForm',{isAuth: req.isAuth})
})

router.get('/editNote/:noteId', auth, async (req,res) => {
   
    const note = await Note.findOne({_id:req.params.noteId})
    res.render('editNote',{note:note,isAuth: req.isAuth})
})

router.get('/dashboard', auth, async (req,res) => {
    const notes = await Note.find({author:req.userId})
    res.render('dashboard',{notes:notes,isAuth: req.isAuth})
})

router.get('/logout', async (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
})

module.exports = router 