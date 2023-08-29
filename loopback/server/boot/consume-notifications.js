const amqplib = require("amqplib");
const axios = require("axios");
const { channel1 } = require("../../server/scripts/rabbitmq_publisher");

// let ch1;

// (async () => {
//   ch1 = await createChannel();
//   console.log("ch1 consume-notifications : " + ch1);
// })();

// console.log("ch1 consume-notifications 2 : " + ch1);

module.exports = async (app) => {
  let ch1;
  ch1 = await channel1();
  const queue = "notifications";
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Rabbitmq Consumer: Recieved ", msg.content.toString());
      axios({
        method: "post",
        url: "http://loopback-app:3000/api/customers/notification",
        data: {
          msg: msg.content.toString(),
        },
      })
        .then(function (response) {
          // handle success
          console.log("Rabbitmq Consumer: Notification sent");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

      ch1.ack(msg);
    } else {
      console.log("Consumer cancelled by server");
    }
  });
};
