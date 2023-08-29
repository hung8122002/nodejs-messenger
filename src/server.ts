import * as http from "http";

import app from "./";
import connect from "./config/db";

connect();
const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
