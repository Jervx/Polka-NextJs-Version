// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoConnect from "../../services/mongoDb";
import Quizes from "../../models/Quiz";
import Users from "../../models/User";

let ObjectId = require("mongoose").Types.ObjectId;

mongoConnect();

export default async function handler(req, res) {
  
  const { mode, quiz_id, quiz_name, quizContent, quizes, uid } = req.body;


  try {
    // find by id
    if (mode === 0) {
      if (quiz_id) {
        const quiz = await Quizes.findOne({ _id: new ObjectId(quiz_id) });
        if (!quiz) return res.status(404).json({ message: "Quiz Not Found" });
        const updateViewCount = await Quizes.updateOne({ _id: new ObjectId(quiz_id) },{$inc : { accessCount : 1} });
        return res.status(200).json(quiz);
      }

      if (quiz_name) {
        const quiz = await Quizes.findOne({ quizName: quiz_name });
        if (!quiz) return res.status(404).json({ message: "Quiz Not Found" });
        const updateViewCount = await Quizes.updateOne({ _id: new ObjectId(quiz_id) },{$inc : { accessCount : 1} });
        return res.status(200).json(quiz);
      }
    }

    // create
    if (mode === 1) {
      const createQuiz = await Quizes.create({ ...quizContent });
      return res.status(200).json({ message: "created!" });
    }

    // update
    if (mode === 2) {
      const updateQuiz = await Quizes.updateOne(
        { _id: new ObjectId(quiz_id) },
        { $set: { ...quizContent } }
      );
      return res.status(200).json({ message: "Updated!" });
    }

    // all
    if (mode === 3){
        const quizesQuery = await Quizes.find({ state : 0 }).sort({cat : -1});
        let quizes = []

        for(var x = 0; x < quizesQuery.length; x++){
            const authorInfo = await Users.findOne({ _id : new ObjectId(quizesQuery[x].toObject().author) }, { _id : 1, name : 1, picture : 1 })
            quizes.push({...quizesQuery[x].toObject(), authorInfo})
        }

        return res.status(200).json(quizes)
    }

    // insert all
    if(mode === 4){
        const quizeS = await Quizes.insertMany(quizes)
        return res.status(200).json("Inserted all quizes")
    }

    // select by user
    if(mode === 5){
        const myQuizes = await Quizes.find({ author : new ObjectId(uid) })
        return res.status(200).json(myQuizes)
    }

    // delete one
    if(mode === -1){
        if(quiz_id){
            const del = await Quizes.deleteOne({ _id : new ObjectId(quiz_id)})
            return res.status(200).json({message : "Deleted!"})
        }
    }

  } catch (e) {
    return res.status(500).json({
      error: 500,
      message: "server error",
      trace: JSON.stringify(e.stack),
    });
  }

  return res.status(400).json({message : "STOP! You don't know what you're doing, don't ya 😏?"});
}
