import express, { Request, Response } from "express";
import { price } from "./listen-price/service";
import { pushMessage } from "./push/controller";
import { add } from "./alarm/controller";
import { startDB } from "./startDB";

startDB().catch((err) => console.log(err));
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`price: ${price}`);
});

app.use(express.json());

app.post("/push", pushMessage);
app.post("/add", add);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
