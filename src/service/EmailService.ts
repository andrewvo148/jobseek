import * as nodemailer from "nodemailer";

export class EmailSevice {

    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'oauth2',
            user: 'andrewvo148@gmail.com',
            clientId: '980346876160-hcjg08e5hhu4lprrki0uf40u333cp6ig.apps.googleusercontent.com',
            clientSecret: 'ZUlF6Of-vQ-5B6RIK6vy_MLi',
            refreshToken: '1/u6e7IVa_OBMClJ3Gr7ISUXSws8oGK38Oy0RoPgbj_4w0GR2IM9VBeJtONahaWwy_',
            accessToken: 'ya29.Il-RB_dkAWqq1_p0NUNGcxXh4x5lMxPe390QiERrLLI-tN4FwhwlMAZJWyzGW4XdZoT_D5sIgtOINqjExYc8boPCXE6vsvXLDeD3MVvjqTyoYlY8m4F9E5k788AaCXM4iA',
        }
    });
    async sendEmail(to: string, subject: string, content: string) {
        return this.transporter.sendMail({
            to: to,
            subject: subject,
            html: content,
        });
    }
}