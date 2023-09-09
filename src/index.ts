import express, { Express } from "express";
import bodyParser from "body-parser";

import cases from "./routes/cases";

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", cases);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
