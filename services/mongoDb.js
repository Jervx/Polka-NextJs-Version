import mongoose from "mongoose";

const connection = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    "mongodb+srv://jervx:helloworld@jervxcluster.p97hy8e.mongodb.net/PolkaQuiz?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
  console.log("Database Connected successflully");
}

export default dbConnect;
