import * as express from "express";

import { checkAuth, upload } from "~/middleware";
import { userController } from "~/controller";

const route = express.Router();
route.get("/", userController.user_paging);

route.post("/signup", userController.user_signup);

route.post("/login", userController.user_login);

route.delete("/:userId", userController.user_delete);

route.put(
  "/:userId",
  checkAuth,
  upload.single("avatar"),
  userController.user_update_by_id
);

route.get("/:userId", userController.user_get_by_id);

export default route;
