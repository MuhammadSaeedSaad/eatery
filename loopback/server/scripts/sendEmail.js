const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ebnrshd521@gmail.com',
    pass: 'jbjdkkuvdgeeujsj'
  }
});

const mailOptions = {
  from: 'youremail@gmail.com',
  to: 'ebnrshd521@gmail.com',
  subject: 'Eatery order status changed',
  text: 'That was easy!'
};



module.exports = {
    transporter,
    mailOptions
};