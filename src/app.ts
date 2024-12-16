import express, { Request, Response } from "express";
import { price } from "./listen-price/service";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`price: ${price}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
