import express, { Request, Response, Application } from 'express';
import * as dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoute from './routes/user.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session'
dotenv.config();

const app: Application = express();
const Port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(session({
    secret: 'myid',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },


}));
app.use(express.urlencoded({ extended: true }));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', __dirname);

declare module 'express-session' {
    interface SessionData {
        loginUser: string;
    }
  }
  
  export {};
app.use('/', function (req, res) {
    req.session.loginUser=""
    res.render('views/index');
});
interface SessionData {
    // existing properties of SessionData
    // ...

    LoginUser: string; // new property
}

app.use("/user", userRoute);





app.listen(Port, () => console.log(`⚡️[server]:listening on  port ${Port}`));


function cros(): any {
    throw new Error('Function not implemented.');
}

