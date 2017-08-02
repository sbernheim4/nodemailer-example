`use strict`;
const nodemailer = require(`nodemailer`);
const shell = require(`shelljs`);
require('dotenv').config()

const zippedFileName = `report.zip`;
const filePath = path.resolve(`./subdir`);

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: `smtp.gmail.com`,
	port: 465,
	secure: true, // secure:true for port 465, secure:false for port 587
	auth: {
		user: process.env.USERNAME,
		pass: process.env.PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
});

// setup email data with unicode symbols
let mailOptions = {
	from: `"Fred Foo 👻" <foo@blurdybloop.com>`, // sender address
	to: `sambernheim@icloud.com`, // list of receivers
	subject: `Test report for WWE`, // Subject line
	text: `Hello world ?`, // plain text body
	html: `<b>Hello world ?</b>`, // html body
	attachments: [
		{
			filename: zippedFileName,
			path: filePath
		}
	]
};

// send mail with defined transport object
function sendMail() {
	zipFiles();
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log(`Message %s sent: %s`, info.messageId, info.response);
	});
}

function zipFiles() {
	shell.exec(`zip -r ${zippedFileName} ${filePath}`);
}
