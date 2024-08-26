import net from "net";
import { HTTPRequest } from "./request";
import { HTTPResponse } from "./response";

interface HTTPServerOptions {
  allowHalfOpen?: boolean;
}

/* Request Handler
 * @request: HTTPRequest
 * @response: HTTPResponse
 * 
 * Calback function passed when creating the HTTP server
*/
type RequestHandler = (request: HTTPRequest, response: HTTPResponse) => void;

class HTTPServer extends net.Server {
  constructor(options?: HTTPServerOptions, requestHandler?: RequestHandler) {
    super({
      allowHalfOpen: false,
      keepAlive: false,
    });

    this.on("connection", (socket) => handleConnection(socket, requestHandler));
  }
}

const handleConnection = (
  socket: net.Socket,
  requestHandler?: RequestHandler
) => {
  socket.on("data", (data) => socketOnData(socket, data, requestHandler));

  socket.on("end", () => {
    console.log("Server ended", socket.localPort);
  });

  socket.on("error", handleSocketError);
};

const socketOnData = (
  socket: net.Socket,
  data: Buffer,
  requestHandler?: RequestHandler
) => {
  console.log("Server - received data:\n", data.toString());
  if (requestHandler) {
    const req = new HTTPRequest(data.toString());
    const res = new HTTPResponse(socket);
    requestHandler(req, res);
    console.log("Updated res", res.statusCode);
  }
};

const handleSocketError = (err: Error) => {
  console.error("Socket Server Error: ", err);
};

export function createSimpleServer(
  options?: HTTPServerOptions,
  requestHandler?: RequestHandler
): HTTPServer;

export function createSimpleServer(requestHandler?: RequestHandler): HTTPServer;

export function createSimpleServer(
  options?: HTTPServerOptions | RequestHandler,
  requestHandler?: RequestHandler
): HTTPServer {
  console.log({ options });
  console.log({ requestHandler });

  if (typeof options == "function") {
    requestHandler = options;
  }

  const server = new HTTPServer(options && {}, requestHandler);

  return server;
}
