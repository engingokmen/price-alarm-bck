import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { price } from "./listen-price/service";
import { pushMessage } from "./push/controller";
import { all, add, removeAll, remove, update } from "./alarm/controller";
import { startDB } from "./startDB";
import Expo from "expo-server-sdk";
import { getAllJobs, toggleJob } from "./jobs/controller";
import { errorHandler, errorMessages, ErrorResponse } from "./utils/error";

startDB().catch((err) => console.log(err));
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ price });
});

app.use(express.json());

app.post("/push", validatePushToken, pushMessage);
app.get("/alarm", validatePushToken, all);
app.post("/alarm", validatePushToken, add);
app.patch("/alarm", validatePushToken, update);
app.delete("/alarm", validatePushToken, remove);
app.delete("/alarm/remove-all", validatePushToken, removeAll);
app.get("/job", getAllJobs);
app.patch("/job", toggleJob);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function validatePushToken(req: Request, res: Response, next: NextFunction) {
  const pushTokenQuery = req.query?.pushToken;
  const pushTokenBody = req.body?.pushToken;

  if (
    (!pushTokenQuery && !pushTokenBody) ||
    (typeof pushTokenQuery !== "string" && typeof pushTokenBody !== "string") ||
    (!Expo.isExpoPushToken(pushTokenQuery) &&
      !Expo.isExpoPushToken(pushTokenBody))
  ) {
    throw new ErrorResponse(errorMessages.INVALID_TOKEN);
  }
  next();
}
