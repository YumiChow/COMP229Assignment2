/*
  File Name: cntact.js
  Student's Name: Yuchen Zhou
  Student ID: 301188341
  Date: 2022/10/29
*/
import { Schema, model } from 'mongoose';


export default model('contact', Schema({
  name: String,
  number: String,
  email: String
}, {
  collection: "contact"
}))