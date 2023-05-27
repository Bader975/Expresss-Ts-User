"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTask = void 0;
const db_1 = require("../config/db");
const AddTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { title, isCompleted } = req.body;
    const newtask = yield db_1.prisma.task.create({
        data: {
            title: req.body.title,
        }
    });
    res.status(201).send({ message: ` The Taks was Created  ${newtask} ` });
});
exports.AddTask = AddTask;
