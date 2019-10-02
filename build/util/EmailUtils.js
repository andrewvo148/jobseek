"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "andrewhiepvn@gmail.com",
        pass: "973@148$115%3hvn"
    }
});
//# sourceMappingURL=EmailUtils.js.map