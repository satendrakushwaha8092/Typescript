import "reflect-metadata";
import { Request, Response } from "express";

import { users } from "../models/user";

export class UserCrud {
    async getUser(req: Request, res: Response) {
        const allUsers: users[] = await users.findAll();
        return res.status(200).json(allUsers);
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user: users | null = await users.findByPk(id);
        return res.status(200).json(user);
    }


    async createUser(req: Request, res: Response){
        const user: users = await users.create({ ...req.body });
        return res.status(201).json(user);
      }
      
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        await users.update({ ...req.body }, { where: { id } });
        const updatedUser: users | null = await users.findByPk(id);
        return res.status(200).json(updatedUser);
      }

    async deleteUser(req: Request, res: Response){
        const { id } = req.params;
        const deletedUser: users | null = await users.findByPk(id);
        await users.destroy({ where: { id } });
        return res.status(200).json(deletedUser);
      }

}
