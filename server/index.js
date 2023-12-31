const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const loadDB = require("./loadDB");
const port = 3001;

conn.sync({ force: true }).then(async () => {
  await loadDB();
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
}).catch(error => console.error("Error syncing database:", error))