import express from "express";
import { Login, Logout, createUser } from "../controller/user.controller";
import { AddTask } from "../controller/task.controller";



const router = express.Router();



router.post('/login', Login)
router.get('/logout', Logout)

router.post('/', createUser)

router.post('/task', AddTask)
// router.delete('/user/task' ,DeleteTask)





export default router;