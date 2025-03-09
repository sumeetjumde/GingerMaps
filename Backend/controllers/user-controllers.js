const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const user = require('../models/user');


const getUsers = async (req,res,next) =>{
    let users
    try{
        users = await User.find({},'-password');
    }catch(err){
        const error = new HttpError('fetching users failed',500);
        return next(error);
    }
    res.json({users:users.map(user => user.toObject({getters:true}))});
};

const signup = async (req,res,next) =>{
    const {name,email,password} = req.body;

    //if the email already exists
    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    }
    catch(err){
        const error = new HttpError('Signup failed',500);
        return next(error);
    }
    
    if(existingUser){
        const error = new HttpError('User exist already,Please login',422);
        return next(error);
    }

    let hashedPassword;
    try{
       hashedPassword = await bcrypt.hash(password, 12); 
    }
    catch(err)
    {
        const error = new HttpError('Could not Create user,please try again.',500);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image:req.file.path,
        password: hashedPassword,
        places:[]
    })

    try{
        await createdUser.save();
    }
    catch(err){
        const error = new HttpError('Signup failed',500);
        return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email },
        "supersecret_dont_share",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        "Signup failed , please try again later.",
        500
      );
      return next(error);
    }

    res.status(201).json({userId : createdUser.id, email : createdUser.email,token:token});
};

const login = async(req,res,next) =>{
    const {email,password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    }
    catch(err){
        const error = new HttpError('Login failed',500);
        return next(error);
    }

    if(!existingUser){
        const error = new HttpError('Invalid credentials entered or user not found',401);
        return next(error);
    }

    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password , existingUser.password);
    }
    catch(err){
        const error = new HttpError('Could not log you in , please check your credentials and try again.',500);
        return next(error);
    }

    if(!isValidPassword){
        const error = new HttpError('Invalid credentials,Could not log you in',401);
        return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "supersecret_dont_share",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        "Logging in failed , please try again later.",
        500
      );
      return next(error);
    }

    res.json({userId:existingUser.id,email:existingUser.email,token:token});
};

//exports
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;