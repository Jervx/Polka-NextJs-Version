import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email : {type : String, required : true, unique : true},
  name : {type : String, required : true},
  profile : { type : String, default : "https://img1.ak.crunchyroll.com/i/spire2/f502d225e63d2dcf6ea9810c37048f971651090640_large.jpg"},
  cat : { type : Date, default : Date.now },
  last_sign : { type : Date, default : Date.now }
});

const User = models.User || model('User', UserSchema);

export default User;