import server from "./src/server";
import conn from './src/db.js';
import loadDB from "./loadDB";

const port = 3001;

conn.sync({ force: true }).then(async () => {
  await loadDB();
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
}).catch(error => console.error(error))
