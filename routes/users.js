// const mongoose = require('mongoose');
// const plm=require("passport-local-mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/newapp");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String
//   },
//   posts: [{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Post"
//   }],
//   dp: {
//     type: String, // Assuming the profile picture is stored as a URL
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
// });

// userSchema.plugin(plm);

// module.exports= mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://admin123:admin123@cluster0.psewfip.mongodb.net/Pinterest");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  dp: {
    type: String,
    // Assuming the profile picture is stored as a URL
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
