# Simple HTTP

## How to run

- Clone this repo: `git clone https://github.com/erickivel/simple-http.git`
- Install dependencies: `npm install`
- Run: `npm run start:dev`

## How to use

### Create server

```typescript
import { createSimpleServer } from "../server";

// createSimpleServer(undefined, (req, res) => {});

const server = createSimpleServer((req, res) => {
  console.log("Req Method: ", req.method);
  res.statusCode = 201;
  res.responseBody = "Yeaaah";
  // res.s;
  res.send();

  return;
});
// createSimpleServer((req, res) => {});

server.listen(3000, () => {
  console.log("Running on port 3000!");
});

```
