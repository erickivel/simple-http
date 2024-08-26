import net from "net";

import simpleHttp from "simple-http";
import { NEW_LINE, STATUS_CODES } from "./constants";

type TransferEncoding = 'normal' | 'chunked'

export class HTTPResponse implements simpleHttp.HTTPResponse {
  private protocol = "HTTP";

  private protocolVersion = "1.1";

  public statusCode: number = 200;

  public statusMessage: string = STATUS_CODES[200];

  public headers: {[key:string]: string} = {}

  public socket: net.Socket;

  private isChunkedHeaderSent = false;

  private transferEncoding: TransferEncoding = 'normal'; 

  constructor(socket: net.Socket) {
    this.socket = socket;
    this.socket.setKeepAlive(true)
    this.socket.setTimeout(5000)
  }

  private sendChunkedTransferHeader() {
    this.headers["Transfer-Encoding"] = "chunked"

    const parsedResponse =
      this.protocol+"/"+this.protocolVersion + " " + this.statusCode + " " + this.statusMessage + NEW_LINE +
      this.headersToString() +
      NEW_LINE

    console.log("Chunked HeaderParsed Response:\n", parsedResponse)

    this.isChunkedHeaderSent = true
    this.socket.write(parsedResponse)
  }

  private sendStreamChunk(chunk: any) {
    const chunk_len = Buffer.byteLength(chunk).toString(16)

    const chunkResponse =
      chunk_len + NEW_LINE +
      chunk + NEW_LINE

    console.log("Chunked Response:\n", chunkResponse)

    this.socket.write(chunkResponse)
  }

  private sendLastChunk() {
    const chunkResponse =
      "0" + NEW_LINE +
      NEW_LINE

    console.log("Last Chunked Response:\n", chunkResponse)

    this.socket.write(chunkResponse)
  }

  public write(chunk: string) {
    if (!this.isChunkedHeaderSent) {
      this.transferEncoding = 'chunked'
      this.sendChunkedTransferHeader()
    }

    this.sendStreamChunk(chunk)
  }

  private sendMessage(messageBody: string) {
    this.headers["Date"] = new Date("2020").toUTCString()
    this.headers["Content-Length"] = Buffer.byteLength(messageBody).toString()

    const parsedResponse =
      this.protocol+"/"+this.protocolVersion + " " + this.statusCode + " " + this.statusMessage + NEW_LINE +
      this.headersToString() +
      NEW_LINE +
      messageBody +
      NEW_LINE;
  
    console.log({parsedResponse})

    this.socket.write(parsedResponse);
  }

  public send(chunk?: string) {
    switch (this.transferEncoding) {
      case 'normal':
        if (chunk) {
          this.sendMessage(chunk)
        } else {
          // TODO Drain/Flush and close socket
        }
        break;

      case 'chunked':
        if (chunk) {
          this.sendStreamChunk(chunk);
        } 
        this.sendLastChunk();
        this.socket.setKeepAlive(false)
        // TODO Drain/Flush and close socket
        break;

      default:
        break;
    }

  }

  private headersToString(): string {
    let stringHeader = ""

    Object.keys(this.headers).forEach((key) => {
      stringHeader += `${String(key)}: ${String(this.headers[key])}${NEW_LINE}`;
    });

    return stringHeader
  }

  public setHeader() {

  }
}
