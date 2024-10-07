const User = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//register user
const registerUser = async (req,res) => {
    const {name,email,mobile,password} = req.body
    //check existing user
    const existUser = await User.findOne({email:email})
    if(existUser){
        res.status(500).json({
            "message":"User already registered"
        })
    }
    //hash password using bcrypt
    const hashPassword = await bcrypt.hash(password,10)
    //save user into database
    const newUser = new User({name,email,mobile,password:hashPassword})
    await newUser.save()

    //genrate token using JWT 
    const token = jwt.sign({userId:newUser._id},process.env.TOKENSECRET)

    res.status(201).json({
        token,
        user:newUser
    })
}

const loginUser = async(req,res) => { 

    try {
        const {email,password} = req.body
        //check user is exist or not 
        const user = await User.findOne({email:email})

        if(!user){
            res.status(401).json({
                "message":"User Not Found In DB"
            })
        }
    
        //check password
        const checkPass = await bcrypt.compare(password,user.password)
        if(!checkPass){
            res.status(401).json({
                "message":"Invalid crediential"
            })
        }
        //genrate token
        const token = jwt.sign({userId:user._id},process.env.TOKENSECRET)
        res.status(201).json({
            token:token,
            user:user
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Something wrong on server"
        })
    }
   

}



module.exports = {registerUser,loginUser}
