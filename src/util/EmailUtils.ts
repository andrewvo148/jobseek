import * as nodemailer from "nodemailer";

export const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "andrewhiepvn@gmail.com",
        pass: "973@148$115%3hvn"
    }
});

