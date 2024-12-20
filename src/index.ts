import express, { NextFunction, Request, Response } from "express";
import { price } from "./listen-price/service";
import { pushMessage } from "./push/controller";
import { all, add, removeAll, remove } from "./alarm/controller";
import { startDB } from "./startDB";
import Expo from "expo-server-sdk";

startDB().catch((err) => console.log(err));
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`price: ${price}`);
});

app.use(express.json());

app.post("/push", pushMessage, validatePushToken);
app.get("/alarm", all, validatePushToken);
app.post("/alarm", add, validatePushToken);
app.delete("/alarm", remove, validatePushToken);
app.delete("/alarm/remove-all", removeAll, validatePushToken);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function validatePushToken(req: Request, res: Response, next: NextFunction) {
  const pushToken = req.body?.pushToken;
  if (!pushToken) {
    res.status(400).json({ error: "pushToken is required" });
  }
  if (!Expo.isExpoPushToken(pushToken)) {
    res.status(400).json({
      error: `Push token ${pushToken} is not a valid Expo push token`,
    });
  }
  next();
}
