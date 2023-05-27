"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const task_controller_1 = require("../controller/task.controller");
const router = express_1.default.Router();
router.post('/login', user_controller_1.Login);
router.get('/logout', user_controller_1.Logout);
router.post('/', user_controller_1.createUser);
router.post('/task', task_controller_1.AddTask);
// router.delete('/user/task' ,DeleteTask)
exports.default = router;
