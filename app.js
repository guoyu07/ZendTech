'use strict';
const app = require("./server/config/app-config");
const PORT = require("./server/config/constants").port;

const config = require("./server/config/constants");

const models = require("./server/models")();

const data = require("./server/data/index")(config, models);

const controller = require("./server/controllers/index")(data);

require('./server/routers/router')({ app, data, controller });

app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));