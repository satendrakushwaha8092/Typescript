import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

import { UserCrud } from '../controllers/users';

const user = new UserCrud();

app.get("/users", user.getUser);
app.get("/users/:id", user.getUserById);
app.post("/users", user.createUser)
app.put("/users/:id", user.updateUser)
app.delete("/users", user.deleteUser);

export default app;