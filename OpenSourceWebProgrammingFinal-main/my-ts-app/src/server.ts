import app from "./app";
import { connectToDatabase } from "./infrastructure/db/mongoConnection";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
