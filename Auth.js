
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/person');



passport.use(new localStrategy(async (Username, password, done) => {
    try{
      // authentication logic here
    //   console.log("recived credetials : ", Username, password);
      const user = await person.findOne({username: Username});
      console.log(user);
      if(!user)
        return done(null, false, {message : "Incorrect username"});
  
      const isPasswordMatch = user.comparePassword(password);
      if(isPasswordMatch){
        return done(null, user);
      }else {
        return done(null, false, {message : 'Incorrect password'});
      }
    }catch(err){
      return done(err);
    }
  }))

  module.exports = passport;