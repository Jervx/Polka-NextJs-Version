// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoConnect from "../../services/mongoDb";
import Quizes from "../../models/Quiz";

let ObjectId = require("mongoose").Types.ObjectId;

mongoConnect();

export default async function handler(req, res) {
  const { mode, quiz_id, quiz_name, quizContent } = JSON.parse(req.body);


  try {
    if (mode === 0) {
      if (quiz_id) {
        const quiz = await Quizes.findOne({ _id: new ObjectId(quiz_id) });
        if (!quiz) return res.status(404).json({ message: "Quiz Not Found" });
        return res.status(200).json(quiz);
      }

      if (quiz_name) {
        const quiz = await Quizes.findOne({ quizName: quiz_name });
        if (!quiz) return res.status(404).json({ message: "Quiz Not Found" });
        return res.status(200).json(quiz);
      }
    }

    if (mode === 1) {
      const createQuiz = await Quizes.create({ ...quizContent });
      return res.status(200).json({ message: "created!" });
    }

    if (mode === 2) {
      const updateQuiz = await Quizes.updateOne(
        { _id: new ObjectId(quiz_id) },
        { $set: { ...quizContent } }
      );
      return res.status(200).json({ message: "created!" });
    }

    if (mode === 3){
        const quizes = await Quizes.find({});
        return res.status(200).json(quizes)
    }

  } catch (e) {
    return res.status(500).json({
      error: 500,
      message: "server error",
      trace: JSON.stringify(e.stack),
    });
  }

  return res.status(404).json({message : "not found"});
}
