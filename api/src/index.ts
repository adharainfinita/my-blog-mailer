import express, { Request, Response } from "express";
import morgan from "morgan";
import mailRoutes from "./routes/mailRoutes.js";
import cors from "cors";

process.loadEnvFile();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Ruta principal
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API funcionando correctamente en Vercel!");
});

// Usar las rutas definidas
app.use("/api", mailRoutes); // 👈 Asegúrate de que las rutas están bajo un prefijo

export default app; // 👈 Exporta app para que Vercel lo maneje
