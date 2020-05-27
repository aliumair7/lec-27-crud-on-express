var express = require('express');
var reg_model=require('./register_model')
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render("user/register")
});

router.get('/login', function(req, res, next) {
  res.render("user/login")
});
router.post('/register',async function(req, res, next) {
  var users=new reg_model(req.body)
  await users.save()
  res.redirect('/')
});

router.post('/login',async function(req, res, next) {
  var users=await reg_model.findOne({email:req.body.email,password:req.body.password})
  if(!users) return res.redirect('/login')
  req.session.user=users;
  return res.redirect('/') 
  
});
router.get('/logout', function(req, res, next) {
  req.session.user=null
  res.redirect("/login")
});



module.exports = router;
