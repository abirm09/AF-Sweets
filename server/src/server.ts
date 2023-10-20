import { connectDB } from "./config/db";
import { app } from "./app";
import { PORT } from "./secret";

app.listen(PORT, async () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  await connectDB();
});
