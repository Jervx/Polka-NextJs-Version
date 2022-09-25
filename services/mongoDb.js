import mongoose from "mongoose";

const connection = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGOURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
  console.log("Database Connected successflully");
}

export default dbConnect;
