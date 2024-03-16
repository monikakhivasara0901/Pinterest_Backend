var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post")
const passport=require('passport');
const upload=require("./multer");

const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */

// router.get('/createuser',async function(req, res, next) {
// let createdUser=await userModel.create({
//   username:"MonikaK",
//   password: "monikaJ",
//   posts: [ ],
//   email: "monikaK@mail1.com",
//   fullName:"Monika Jain"
//  });
//  res.send(createdUser);
// });
// //1st post of user1
// // router.get('/createpost',async function(req, res, next) {
// //   let createdpost=await postModel.create({
// //     postText:"Hello EveryOne",
// //     user:"65e32a0cabacd8c96fd771cc"
// //   });
// //   let user=await userModel.findOne({_id: "65e32a0cabacd8c96fd771cc"});
// //   user.posts.push(createdpost._id);
// //   await user.save();
// //    res.send("done");
// //   });

// //2nd post of same user

// router.get('/createpost',async function(req, res, next) {
//   let createdpost=await postModel.create({
//     postText:"Hello kaise ho",
//     user:"65e32a0cabacd8c96fd771cc"
//   });
//   let user=await userModel.findOne({_id: "65e32a0cabacd8c96fd771cc"});
//   user.posts.push(createdpost._id);
//   await user.save();
//    res.send("done");
//   });

//   //route jaha sare user ke post dekh sakte hai
//   router.get('/alluserposts',async function(req,res,next){
//        let user= await userModel
//        .findOne({_id:"65e32a0cabacd8c96fd771cc"})   //this is giving only id
//        .populate('posts');                          //this is giving actual data of posts
//        res.send(user)
//   })

//Actual Code for project
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  // console.log(req.flash("error"));
  res.render('login',{error:req.flash('error')});
});


router.get('/feed', function(req, res, next) {
  res.render('feed');
});

router.post('/upload',isLoggedIn,upload.single("file"),async function(req,res,next){
  //Access the uploaded file details via req.file
  if(!req.file){
    return res.status(400).send("No files were uploaded");
  }
  // res.send("File uploaded successfully!");
  // jo file upload hui hai use save karo as a post and uska postid user ko do and  post ko user id do
  const user=await userModel.findOne({username:req.session.passport.user});
  const post=await postModel.create({
    image:req.file.filename,
    imageText:req.body.filecaption,
    user:user._id
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.get('/register',function(req,res){
  // const userData=new userModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   fullName:req.body.fullName
  // }) 
})

//after reducing the code 
router.post('/register',function(req,res){
  const { username, email, fullName } = req.body;
  const userData = new userModel({ username, email, fullName });

  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})

router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true
}),function(req,res){
});

router.get("/logout",function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

router.get('/profile',isLoggedIn,async function(req,res,next){
   const user=await userModel.findOne({
    username:req.session.passport.user
   })
   .populate("posts");
  // console.log(user);
  res.render("profile",{user});
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}


module.exports = router;
