declare module "simple-http" {
  import net from "net"

  export type Headers = {[key:string]: string}

  export interface IRequestParsedData {
    method: string;
    resource: string;
    version: string;
    protocol: string;
    headers: Headers;
    body: string;
  }

  type TransferEncoding = 'normal' | 'chunked'

  export class HTTPRequest {
    /**
     * @param TCP connection socket 
     * @since v0.1.0
     */
    constructor(requestString: string)

    /**
     * The request method
     * @since v0.1.0
     */
    public readonly method: string;
    /**
     * The request resource
     * @since v0.1.0
     */
    public readonly resource: string;
    /**
     * The HTTP version (major and minor)
     * @since v0.1.0
     */
    public readonly version: string;
    /**
     * The network protocol
     * @since v0.1.0
     */
    public readonly protocol: string;
    /**
     * The request headers
     * @since v0.1.0
     */
    public readonly headers: Headers;
    /**
     * The request body
     * @since v0.1.0
     */
    public readonly body: string;
  }

  export class HTTPResponse {
    /**
     * @param TCP connection socket 
     * @since v0.1.0
     */
    constructor(socket: net.Socket)

    /**
     * The response status code
     * @since v0.1.0
     */
    public statusCode: number;
    /**
     * The response status message
     * @since v0.1.0
     */
    public statusMessage = STATUS_CODES[200];
    /**
     * The TCP connection socket
     * @since v0.1.0
     */
    public socket: net.Socket;

    /**
     * Sends the HTTP response
     *
     * @param chunk string
     * @returns void
     *
     * @since v0.1.0
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
    public setHeaders(key: string, value: string): void
  }
}
