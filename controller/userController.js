const User = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//register user
const registerUser = async (req,res) => {
    const {name,email,mobile,password} = req.body
    //check existing user
    const existUser = await User.findOne({email:email})
    if(existUser){
        return res.render('register', { error: 'User already exist.',isAuth: req.isAuth });
    }
    //hash password using bcrypt
    const hashPassword = await bcrypt.hash(password,10)
    //save user into database
    const newUser = new User({name,email,mobile,password:hashPassword})
    await newUser.save()

    //genrate token using JWT 
    const token = jwt.sign({userId:newUser._id},process.env.TOKENSECRET)
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/success')
}

const loginUser = async(req,res) => { 

    try {
        const {email,password} = req.body
        //check user is exist or not 
        const user = await User.findOne({email:email})

        if(!user){
            return res.render('login', { error: 'User not found. Please try again.',isAuth: req.isAuth });
        }
    
        //check password
        const checkPass = await bcrypt.compare(password,user.password)
        if(!checkPass){
            return res.render('login', { error: 'Invalid crediential',isAuth: req.isAuth });
        }
        //genrate token
        const token = jwt.sign({userId:user._id},process.env.TOKENSECRET)
       
        //store token into cookies
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard')
        
    } catch (error) {
        return res.render('login', { error: 'Something wrong on server.',isAuth: req.isAuth });
    }
   

}



module.exports = {registerUser,loginUser}
