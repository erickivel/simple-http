import { createSimpleServer } from "./server";

const server = createSimpleServer();

server.listen(3000, () => {
  console.log("Running on port 3000!");
});
