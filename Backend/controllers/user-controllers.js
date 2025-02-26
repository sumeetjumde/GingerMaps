const User = require('../models/user');

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

    const createdUser = new User({
        name,
        email,
        image:req.file.path,
        password,
        places:[]
    })

    try{
        await createdUser.save();
    }
    catch(err){
        const error = new HttpError('Signup failed',500);
        return next(error);
    }

    res.status(201).json({user:createdUser.toObject({getters:true})});
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

    if(!existingUser || existingUser.password !==password){
        const error = new HttpError('Invalid credentials entered or user not found',401);
        return next(error);
    }

    res.json({message:'Logged in',user:existingUser.toObject({getters:true})});
};

//exports
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;