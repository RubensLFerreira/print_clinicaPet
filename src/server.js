import express from "express";
import cors from "cors";

import { router } from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).send("Server rodando!");
});

app.listen("8080", () => {
  console.log("Server is running on port - http://localhost:8080");
});
