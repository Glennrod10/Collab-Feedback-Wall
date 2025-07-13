const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req , res) => {
  const {username , email, password} = req.body;
  try {
    let existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({
      username,
      email,
      password:hashedPassword
    })
    await user.save();

    // generate token to send back to user
    const token = jwt.sign({id: user._id} , JWT_SECRET , {expiresIn: '1d'});
    res.status(201).json({
      token,
      user:{
        id: user._id,
        username,
        email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({message :"server error"})
  }
}


exports.login = async (req ,res) => {
  const{email ,password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({message:"Invalid credsentials"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({message:"Invalid credsentials"});
    }

    const token = jwt.sign({id:user._id} ,JWT_SECRET , {expiresIn: '1d'});
    res.json({
      token,
      user: { id: user._id, username: user.username, email }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message :"server error"})
  }
}