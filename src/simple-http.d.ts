declare module "simple-http" {
  import { LookupFunction, Server as NetServer, Socket, TcpSocketConnectOpts } from "node:net";

  export class IHTTPRequest {
    public method: string;
    public resource: string;
    public version: string;
    public protocol: string;
    public headers: {[key:string]: string};
    public body: string = "";
  }


  export class HTTPResponse {
    /**
     * Sends the HTTP response
     *
     *
     * @since v0.0.3
     */
    public send(chunk: string): void
    /**
     * Set a custom header
     *
     * @param key string
     * @param value string
     * @returns void
     * 
     * @since v0.0.3
     */
    public setHeader(key: string, value: string): void
  }
}
