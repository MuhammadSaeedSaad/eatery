"use strict";

const amqplib = require("amqplib");
const { channel2 } = require("../../server/scripts/rabbitmq_publisher");

let ch1;

(async () => {
  ch1 = await channel2();
  console.log("ch1 : " + ch1);
})();

console.log("ch1 : order.js -- " + ch1);

module.exports = function (Order) {
  Order.beforeRemote("create", function (context, order, next) {
    context.args.data.customerId = context.req.accessToken.userId;
    next();
  });

  Order.afterRemote(
    "prototype.patchAttributes",
    async function (context, order, next) {
      console.log("ch1 : order.js -- inside afterRemote -- " + ch1);
      ch1.sendToQueue(
        "notifications",
        Buffer.from("order " + order.name + " " + order.status)
      );
      console.log(
        "Rabbitmq Publisher: Message " +
          "order " +
          order.name +
          order.status +
          " sent"
      );

      next();
    }
  );
};
