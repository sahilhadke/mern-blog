import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({'message': 'Hello World!!!'})
}

export const updateUser = async (req, res, next) => {
    
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You can only update your own account'));
    }

    if( req.body.password){
        if(req.body.password.trim() === ''){
            return next(errorHandler(400, 'Password cannot be empty'));
        }
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'Password must be at least 6 characters long'));
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    if(req.body.username){
        if(req.body.username.trim() === ''){
            return next(errorHandler(400, 'Username cannot be empty'));
        }
        if(req.body.username.length < 6 || req.body.username.length > 20){
            return next(errorHandler(400, 'Username must be between 6 and 20 characters long'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username must contain only letters and numbers'));
        }
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                photoURL: req.body.photoURL,
                password: req.body.password
            }
        }, {new: true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }catch(err){
        console.log(err)
        return next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You can only delete your own account'));
    }
    
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({'message': 'User deleted successfully'});
    }catch(err){
        next(err);
    }
}