import { prisma } from '../config/db';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import express, { Request, Response } from "express";



export const AddTask = async (req: Request, res: Response) => {

    // const { title, isCompleted } = req.body;
    const newtask = await prisma.task.create({

        data: {
            title: req.body.title,


        }
    });
    res.status(201).send({ message: ` The Taks was Created  ${newtask} ` });
}



