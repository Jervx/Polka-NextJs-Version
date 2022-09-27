import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email : { type : String, required : true, unique : true }, // email address
  name : { type : String, required : true }, // username
  givenName : { type : String , required : true }, // real name
  picture : { type : String, default : ''}, 
  locale : { type : String, default : ''},
  dateJoined : { type : Date, default : Date.now },
  lastSignedIn : { type : Date, default : Date.now},
  provider : { type : String, default : ''},
  signInCount : { type : Number, default : 0}
});

const User = models.User || model('User', UserSchema);

export default User;