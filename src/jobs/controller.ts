import { Request, Response } from "express";
import { IJob } from "../../types";
import { runJob } from "./checkAlarms";

export const jobs: IJob = {
  runPriceCheck: false,
};

export const getAllJobs = (req: Request, res: Response) => {
  res.json(jobs);
};

export const toggleJob = async (req: Request, res: Response) => {
  const { id } = req.body as { id: keyof IJob };
  if (!id || !Object.keys(jobs).includes(id)) {
    res.status(400).json({ error: "id is required" });
  }
  jobs[id] = !jobs[id];
  runJob();
  res.json(jobs);
};
