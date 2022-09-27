import { Schema, model, models, Mongoose } from 'mongoose';

const QuizSchema = new Schema({
  Subject: {type : String, default : ""},
  quizName : { type : String, default : ""},
  quizType : { type : Number, default : 0}, // 0 multiple, 1 identi, 2 mixed
  questions : { type : Array, default : [] },
  answeredBy : { type : Array, default : []},
  cat : { type : Date, default : Date.now },
  accessCount : { type : Number, default : 0 },
  author : { type : Schema.Types.ObjectId, required : true },
  state : { type : Number, default : 1 } // 0 - public, 1 - private, -1 archived
});

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;