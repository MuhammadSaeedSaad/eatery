"use strict";


// should be seperated
module.exports = function (Customer) {
  Customer.notification = async function (msg) {

    console.log("/api/customer/notification: Got notified that ... " + msg);

    return "Got notified that ... " + msg;
  };

  Customer.remoteMethod("notification", {
    http: {
      path: "/notification",
      verb: "post",
    },
    accepts: { arg: "msg", type: "string" },
    returns: { arg: "ack", type: "string" },
  });
};
