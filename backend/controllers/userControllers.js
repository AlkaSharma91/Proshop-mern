import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';

//@desc Auth user & get token
//@route Post /api/users/login
//@access public

export const authUser = async (req, res) => {
  
  try {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });
    console.log("user is",user);

    if (user && (await user.matchPassword(password))) {
      console.log("password matched");
      res.status(200).json({
        isAdmin: user.isAdmin,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      console.log("password do not  matched");
      res.status(401);
      throw new Error("invalid email or password");
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
};

//@desc register new user
//@route Post /api/users/
//@access public

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    } else {                                                                   
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          isAdmin: user.isAdmin,
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("invalid user data");
      }
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
};

//@desc get  user profile
//@route GET /api/users/profiles
//@access private

export const getUserProfile = async (req, res) => {
  try {
    const user=await User.findById(req.user._id)
    if (user){
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token: generateToken(user._id),
  
      });

    }else{
      res.json(404)
      throw new Error('User not found')
    }
   
  } catch (error) {
    res.json({ error: error.message });
  }
};
