import * as http from "http";
import "module-alias/register";

import app from "./";
import connect from "./config/db";

connect();
const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
