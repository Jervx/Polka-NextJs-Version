import { Schema, model, models } from 'mongoose';

const QuizSchema = new Schema({
  Subject: {type : String, default : ""},
  quizName : { type : String, default : ""},
  questions : { type : Array, default : [] },
  answeredBy : { type : Array, default : []},
  cat : { type : Date, default : Date.now },
  accessCount : { type : Number, default : 0 }
});

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;