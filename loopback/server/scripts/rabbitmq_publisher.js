const amqplib = require("amqplib");

// let ch1;
// (async () => {
//   const conn = await amqplib.connect("amqp://rabbitmq");
//   ch1 = await conn.createChannel();
// })();

// // amqplib.connect("amqp://rabbitmq").then((conn) => {
// //     conn.createChannel().then((channel) => {
// //         ch1 = channel;
// //     }).catch((e) => {
// //         console.log(e);
// //     });
// // }).catch((e) => {
// //     console.log(e);
// // })

const connectToChannel = async () => {
  try {
    let connection = await amqplib.connect("amqp://rabbitmq");
    return connection.createChannel();
  } catch (e) {
    console.error("failed to create amqp channel: ", e);
  }
};

let ch1;
let ch2;

module.exports = {
  channel1: async () => {
    if (ch1 == null) {
      ch1 = await connectToChannel();
    }
    return ch1;
  },
  channel2: async () => {
    if (ch2 == null) {
      ch2 = await connectToChannel();
    }
    return ch2;
  }
}
