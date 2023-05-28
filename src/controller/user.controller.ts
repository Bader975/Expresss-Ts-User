import express, { NextFunction, Request, Response } from "express";
import { prisma } from '../config/db';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import nodemailer from "nodemailer";





export const Login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    let user = await prisma.user.findFirst({

      where: {
        email
      },


    });

    if (!user || (!await argon2.verify(user.password, req.body.password))) {
      res.status(401).json({ message: "خطاء في البريد او كلمة المرور !" });
    }

    else {
      // let token = jwt.sign({ id: user.id, name: user.name, }, process.env.MY_SECRETKEY as string, {
      //   expiresIn: "1h"
      // }); 
      let token = jwt.sign({ User: user }, process.env.MY_SECRETKEY as string, {
        expiresIn: "1h"
      });
      //Sending Cookies------
      // res.cookie("name", user.name)
      // res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

      // Saving the User In sessetion
      req.session.loginUser = user as any



      // ------------
      console.log(req.session);


      res.render("views/profile", {
        message: `اهلا وسهلا بك ${user.name} `,
        token: token
      })

      // res.json({
      //   message: `اهلا وسهلا بك ${user.name} `,
      //   token: token
      // })
      // -------------------

      // res.send({
      //   message: `اهلا وسهلا بك ${user.name} `,
      //   token: token
      // })
    }
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req: Request, res: Response) => {
  console.log(req.cookies);
  res.clearCookie("name")
  res.clearCookie("token")
  res.render("views/index")

}

export const createUser = async (req: Request, res: Response) => {

  let hashedPassword = await argon2.hash(req.body.password);
  const { email, name } = req.body;
  const newUser = await prisma.user.create({

    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  if (newUser) {
    res.status(201).json({ "msg": "The user has been created", newUser })

    //Nodemali

    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        // smtp.gmail.com
        // host: "smtp.ethereal.email",
        host: 'smtp.gmail.com',
        service: "gmail",
        port: 587 | 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "bader.mohamd998@gmail.com", // generated ethereal user
          pass: "XXXXXXXXXXX", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'bader.mohamd998@gmail.com', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    // main().catch(console.error);
  }

};





// const deleteUser = async (iduser: string) => {
//   return await prisma.user.delete({
//     where: { id: iduser }
//   })
// }



// deleteUser("4e040daa-9583-4b38-943e-f85e34ce02a7")

