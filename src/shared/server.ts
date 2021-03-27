import { app } from "./app";

const APP_PORT = process.env.APP_PORT || 3333;
app.listen(APP_PORT, () => {
  console.log(`▶️ Server started on port ${APP_PORT} !`);
});
