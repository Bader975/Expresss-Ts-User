"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.Logout = exports.Login = void 0;
const db_1 = require("../config/db");
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        let user = yield db_1.prisma.user.findFirst({
            where: {
                email
            },
        });
        if (!user || (!(yield argon2.verify(user.password, req.body.password)))) {
            res.status(401).json({ message: "خطاء في البريد او كلمة المرور !" });
        }
        else {
            // let token = jwt.sign({ id: user.id, name: user.name, }, process.env.MY_SECRETKEY as string, {
            //   expiresIn: "1h"
            // }); 
            let token = jwt.sign({ User: user }, process.env.MY_SECRETKEY, {
                expiresIn: "1h"
            });
            //Sending Cookies------
            // res.cookie("name", user.name)
            // res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            // Saving the User In sessetion
            req.session.loginUser = user;
            // ------------
            console.log(req.session);
            // res.render("views/profile", {
            //   message: `اهلا وسهلا بك ${user.name} `,
            //   token: token
            // })
            res.json({
                message: `اهلا وسهلا بك ${user.name} `,
                token: token
            });
            // -------------------
            // res.send({
            //   message: `اهلا وسهلا بك ${user.name} `,
            //   token: token
            // })
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.Login = Login;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    res.clearCookie("name");
    res.clearCookie("token");
    res.render("views/index");
});
exports.Logout = Logout;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hashedPassword = yield argon2.hash(req.body.password);
    const { email, name } = req.body;
    const newUser = yield db_1.prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });
    if (newUser) {
        res.status(201).json({ "msg": "The user has been created", newUser });
        //Nodemali
        function main() {
            return __awaiter(this, void 0, void 0, function* () {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = yield nodemailer_1.default.createTestAccount();
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer_1.default.createTransport({
                    // smtp.gmail.com
                    // host: "smtp.ethereal.email",
                    host: 'smtp.gmail.com',
                    service: "gmail",
                    port: 587 | 465,
                    secure: true,
                    auth: {
                        user: "bader.mohamd998@gmail.com",
                        pass: "XXXXXXXXXXX", // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                // send mail with defined transport object
                let info = yield transporter.sendMail({
                    from: 'bader.mohamd998@gmail.com',
                    to: `${req.body.email}`,
                    subject: "Hello ✔",
                    // text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                });
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        }
        // main().catch(console.error);
    }
});
exports.createUser = createUser;
// const deleteUser = async (iduser: string) => {
//   return await prisma.user.delete({
//     where: { id: iduser }
//   })
// }
// deleteUser("4e040daa-9583-4b38-943e-f85e34ce02a7")
