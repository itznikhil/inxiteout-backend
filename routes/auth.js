const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("../middleware/validations");
const validation = require('../middleware/ValidationList')
//REGISTER
router.post("/register", [validate(validation.userSchema)], async (req, res) => {
  if(req.body && req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if(user){
      return res.status(400).json({response:"Account with Same Email address already exist!"});
    }
  }
  if(req.body && req.body.username){
    const username = await User.findOne({ username: req.body.username });
    if(username){
      return res.status(400).json({response:"Username already exist!"});
    }
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login",[validate(validation.loginSchema)], async (req, res) => {
  console.log('tried logging in')
  console.log(req.body)
  if(req.body && !req.body.username && !req.body.password) {
    return res.status(400).json({response:"Please check the credentials!"});
  }
  try {
    // VALIDATE USERNAME
    const user = await User.findOne({ username: req.body.username });
    console.log('user exists or not-',user)
    if(!user){
      return res.status(400).json({response:"Username does not exist!"});
    } 
    // VALIDATE PASSWORD
    const validated = await bcrypt.compare(req.body.password, user.password);
      console.log('password validation-',validated)
      if(!validated){
        return res.status(400).json({response:"Please check the password!"});
      } 

    // LOGIN SUCCESS
    const { password, ...others } = user._doc;
    console.log('user',user)
    // Create token
    const token = jwt.sign(
      { user_id: user._id, username: user.username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "4h",
      }
    );
    console.log('token',token)
    
    // save user token
    others.token = token;
    console.log('others',others)
    return res.status(200).json(others);
    
  } catch (err) {
    return res.status(500).json(err);
  }
});
//isLoggedin
router.post("/isLoggedin", async (req, res) => {
    try{
        var token = req.body.token;
        if(!req.body.token){
          return res.status(400).json({response:"Token is required."});
        }
        console.log(token);
        var userFound = false;
        if(token){
            data = await jwt.verify(token, process.env.TOKEN_KEY);
            // user = await getUser(data);

            console.log('Data: ',data);
            // console.log('User: ', user);
            return res.status(200).json({response:'Token is valid.'});
        }
        else
          return res.status(400).json({response:"Token Expired."});
    }
    catch(error){
        console.log(error);
        return res.status(400).json({response:"Token Expired."});
    }
});

module.exports = router;
