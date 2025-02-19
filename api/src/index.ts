import express, { Request, Response } from "express";
import morgan from "morgan";
import mailRoutes from "./routes/mailRoutes.js";

process.loadEnvFile();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Ruta principal
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API funcionando correctamente!");
});

// Usar las rutas definidas
app.use(mailRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
