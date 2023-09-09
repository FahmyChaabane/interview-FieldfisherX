import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { CaseRequestBody } from "../types/Case.dto";
import { Case } from "../types/Case";
import fs from "fs";
import path from "path";

const router = Router();

router.post("/case", async (req: Request, res: Response): Promise<void> => {
  const caseRequestBody = new CaseRequestBody();
  caseRequestBody.customerName = req.body?.customerName;
  caseRequestBody.startDate = req.body?.startDate;
  caseRequestBody.isFinished = req.body?.isFinished;

  const errors = await validate(caseRequestBody);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const customerName = req.body?.customerName;
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomChars = Math.random().toString(36).substring(2, 6);
  const fxFileId = `${customerName}-${currentYear}-${randomChars}.txt`;
  const storedCaseData = { fxFileId, ...caseRequestBody };
  const fileData = JSON.stringify(storedCaseData);

  try {
    const dataFolderPath = path.join(__dirname, "..", "..", "..", "data");

    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath, { recursive: true });
    }

    const filePath = path.join(dataFolderPath, fxFileId);
    await fs.promises.writeFile(filePath, fileData);
    res.status(200).send(storedCaseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create file" });
  }
});

router.get("/allcases", async (req: Request, res: Response): Promise<void> => {
  try {
    const files = await fs.promises.readdir("./data");
    const cases: Case[] = await Promise.all(
      files.map(async (file) => {
        const jsonString = await fs.promises.readFile(
          `./data/${file}`,
          "utf-8"
        );
        return JSON.parse(jsonString) as Case;
      })
    );

    res.json(cases);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error, Data folder might not exist" });
  }
});

export default router;
