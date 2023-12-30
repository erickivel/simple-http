import net from "net";

class HTTPServer extends net.Server {
  public readonly port: number;

  constructor(port?: number) {
    super({
      allowHalfOpen: true,
      keepAlive: true,
      keepAliveInitialDelay: 5,
    });

    this.port = port || 80;
  }
}

export const createSimpleServer = () => {
  const server = new HTTPServer();

  server.on("connection", (socket) => handleConnection(socket));

  const handleConnection = (socket: net.Socket) => {
    socket.on("data", (data) => {
      console.log("Server - received data:\n", data.toString());

      const responseBody = "Hello, World!";
      const response = `HTTP/1.1 205 OK\r\nDate: ${new Date().toUTCString()}\r\nContent-Type: text/plain\r\nContent-Length: ${Buffer.byteLength(
        responseBody
      )}\r\n\r\n${responseBody}`;

      socket.write(response);
    });

    socket.on("end", () => {
      console.log("Server ended", socket.localPort);
    });

    socket.on("error", (err) => {
      console.error("Socket Server Error: ", err);
    });
  };

  return server;
};
