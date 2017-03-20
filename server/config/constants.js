const connectionString = "mongodb://localhost:27017/blog",
    //port = 3001,
    port = 3001,
    // console.log(port);
    path = require("path"),
    rootPath = path.normalize(__dirname + "/../..");

module.exports = {
    environment: process.env.NODE_ENV,
    connectionString: connectionString,
    port: port,
    rootPath: rootPath
};