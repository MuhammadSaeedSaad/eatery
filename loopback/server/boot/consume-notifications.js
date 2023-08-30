const amqplib = require("amqplib");
const axios = require("axios");
const { channel1 } = require("../../server/scripts/rabbitmq_publisher");
let { transporter, mailOptions } = require("../../server/scripts/sendEmail");

module.exports = (app) => {
  const queue = "notifications";
  channel1()
    .then(async (channel) => {
      await channel.assertQueue(queue);
      channel.consume(queue, (msg) => {
        if (msg !== null) {
          console.log("Rabbitmq Consumer: Recieved ", msg.content.toString());

          mailOptions.text = msg.content.toString();

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          channel.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    })
    .catch((e) => console.log(e));
};
