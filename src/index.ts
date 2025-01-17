import { config, configDotenv } from "dotenv";
import app from "./app";

config();
console.log(process.env.PORT);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
