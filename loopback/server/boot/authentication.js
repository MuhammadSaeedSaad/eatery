module.exports = function enableAuthentication(server) {
  server.enableAuth({ datasource: "mongoDs" });
};
