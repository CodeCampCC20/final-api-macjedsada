import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
