import { createSimpleServer } from "../server";

const server = createSimpleServer((req, res) => {
  console.log("Req:", req);
  res.statusCode = 201;
  res.headers = {
    // "Transfer-Encoding": "chunked",
    "Connection": "keep-alive",
    "Keep-Alive": "timeout=5",
  }
  
  // res.setHeader()
  res.write("Chunk 1");
  res.send("Chunk 2");


  return;
});

server.listen(3000, () => {
  console.log("Running on port 3000!");
});
