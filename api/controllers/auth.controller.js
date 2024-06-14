import { json } from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    // validation
    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === ''){
        return next(errorHandler(400, 'All fields are required'));
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try{
        await newUser.save();
        res.json({message: 'Signup success'});
    }catch(err){
        return next(err);
    }

}

export const signin = async (req, res, next) => {

    const {email, password} = req.body;

    // validation
    if (!email || !password || email.trim() === '' || password.trim() === ''){
        return next(errorHandler(400, 'All fields are required'));
    }

    try{
        const user = await User.findOne({email});
        if (!user){
            return next(errorHandler(400, 'Invalid credentials'));
        }

        

        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch){
            return next(errorHandler(400, 'Invalid credentials'));
        }

        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET
        );

        const {password: pass, ...rest} = user._doc;
        res.status(200).cookie('token', token, {
            httpOnly: true,
        }).json(rest);

    }catch(err){
        return next(err);
    }
}

export const googleAuth = async (req, res, next) => {
    const {email, photoURL, name} = req.body;
    
    // validation
    if (!email || email.trim() === ''){
        return next(errorHandler(400, 'All fields are required'));
    }

    const user = await User.findOne({email});
    if(user){
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET
        );
        const {password, ...rest} = user._doc;
        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
    }else{
        const randomGeneratedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(randomGeneratedPassword, 10);
        const username = name.replace(/\s/g, '') + (Math.floor(Math.random() * 1000));

        const newUser = new User({
            email,
            username,
            photoURL,
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign(
            {id: newUser._id}, 
            process.env.JWT_SECRET
        );
        const {password, ...rest} = newUser._doc;
        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
    }
}