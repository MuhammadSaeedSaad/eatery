"use strict";

const amqplib = require("amqplib");
const { channel2 } = require("../../server/scripts/rabbitmq_publisher");

module.exports = function (Order) {
  Order.beforeRemote("create", function (context, order, next) {
    context.args.data.customerId = context.req.accessToken.userId;
    next();
  });

  Order.afterRemote(
    "prototype.patchAttributes",
    function (context, order, next) {
      channel2()
        .then((channel) => {
          channel.sendToQueue(
            "notifications",
            Buffer.from(
              "your order " +
                order.name +
                "'s status changed to " +
                order.status
            )
          );
          console.log(
            "Rabbitmq Publisher: Message " +
              "order " +
              order.name +
              " " +
              order.status +
              " sent"
          );
        })
        .catch((e) => console.log(e));

      next();
    }
  );
};
