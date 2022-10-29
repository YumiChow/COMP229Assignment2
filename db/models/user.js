/*
  File Name: user.js
  Student's Name: Yuchen Zhou
  Student ID: 301188341
  Date: 2022/10/29
*/
import { Schema, model } from 'mongoose';


export default model('user', Schema({
  username: String,
  password: String,
  email: String
}, {
  collection: "user"
}))