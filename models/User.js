import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email : { type : String, unique : true },
  name : { type : String, required : true },
  given_name : { type : String, required : true },
  picture : { type : String, default : ''},
  cat : { type : Date, default : Date.now }
});

const User = models.User || model('User', UserSchema);

export default User;