import "reflect-metadata";
import express from "express";

import connection from "./connection";

import userRoute from './routes/user';

const app = express();

app.use('/api', userRoute);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();