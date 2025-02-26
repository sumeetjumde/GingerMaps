// Imports
const fs = require('fs');
const HttpError = require('../models/http-error');
const {v4:uuid} = require('uuid');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');


// Get Places by Id
const getPlaceById = async (req,res,next)=>{
    const placeId = req.params.pid;
    
    // Old Code
    // const place = Dummy_places.filter(p=> {
    //     return p.id === placeId;
    // })

    let place;
    try{
        place = await Place.findById(placeId);
    }
    catch(err){
        const error = new HttpError('Somthing went wrong,could not find a place',500);
        return next(error);
    }
    
    // Old code
    // //Error Handling
    // if(!place || place.length === 0){
    //     throw new HttpError('Could not find the place for the provided Id.',404); // Error Handling       
    // }

    //Error Handling // new code
    if(!place || place.length === 0){
        const error = new HttpError('Could not find the place for the provided Id.',404); // Error Handling      
        return next(error); 
    }

    res.json({place:place.toObject({getters:true})});
};


// get places by user id
const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
  
    // let places;
    let userWithPlaces;
    try {
      userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
      const error = new HttpError(
        'Fetching places failed, please try again later.',
        500
      );
      return next(error);
    }
  
    // if (!places || places.length === 0) {
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return next(
        new HttpError('Could not find places for the provided user id.', 404)
      );
    }
  
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
  };


// New Places Created
const createdPlace = async (req,res,next) => {
    const { title,description,location,address,creatorId } = req.body;

// Old Code    
    // const createdPlace = {
    //     id:uuid(),
    //     title,
    //     description,
    //     location,
    //     address,
    //     creatorId
    // };

// Updated code with respect to developed Schema of db    
    const createdPlace = new Place({
        title,
        description,
        address,
        location,
        image:req.file.path,
        creatorId
    });

    let user;
    try{
        user = await User.findById(creatorId);
    }
    catch(err){
        const error = new HttpError('creating place failed,User not exists',500);
        return next(error);
    } 
    
    if(!user){
        const error = new HttpError('could not find user with provided id',500);
        return next(error);
    }

try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({session:session});
    user.places.push(createdPlace);
    await user.save({session:session});
    await session.commitTransaction();
}
catch(err){
    const error = new HttpError('creating place failed',500);
    return next(error);
}    


    res.status(201).json({place:createdPlace});
};





//Updating the New place
const updatePlaceById = async (req,res,next) => {
    const { title,description } = req.body;
    const placeId = req.params.pid;
    let place;
    try{
        place = await Place.findById(placeId);
    }catch(err){
        const error = new HttpError('something went wrong ,could not update place',500);
        return next(error);
    }
    //updating the values
    place.title = title;
    place.description = description;
    //setting the index
    try{
        await place.save();
    }
    catch(err){
        const error = new HttpError('something went wrong ,could not update place',500);
        return next(error);
    }
    //sending the response
    res.status(200).json({place:place.toObject({getters:true})});

} 





// Deleting the places
const deletePlaceById = async (req,res,next) => {
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId).populate('creatorId'); 
    }
    catch(err){
        const error = new HttpError('Could not delete a place1',500);
        return next(error);
    }
    
    if(!place){
        const error = new HttpError('Could not find a place for this Id',404);
        return next(error);
    }

    // Getting the image path
    const imagepath = place.image;

    try{
        const sess = await mongoose.startSession();
        console.log('1');
        sess.startTransaction();
        console.log('2');
        await place.deleteOne({ session: sess });
        console.log('3');
        place.creatorId.places.pull(place);
        console.log('place');
        await place.creatorId.save({ session: sess });
        await sess.commitTransaction();
        
    }
    catch(err){
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
          );
          return next(error);      
    }

    //Delete linked images also
    fs.unlink(imagepath,err => {
        console.log(err);
    });

    res.status(200).json({message:'Deleted Place'});
};  





//Exports
exports.getPlaceById = getPlaceById;
exports.getUserById = getUserById;
exports.createdPlace = createdPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;