import { IHTTPRequest } from "simple-http"
import { NEW_LINE } from "./constants";

export class HTTPRequest implements IHTTPRequest {
  public method = "";
  public resource = "";
  public version = "";
  public protocol = "";
  public headers: {[key:string]: string} = {};
  public body = "";

  constructor(requestString: string) {
    const lines = requestString.split(NEW_LINE)

    if(!lines[0]) {
      throw new Error("Request parse error")
    }

    const startLine = lines.shift()?.split(" ")

    if(!startLine || !startLine[0] || !startLine[1] || !startLine[2]) {
      throw new Error("Request parse error")
    }
  
    console.log("startLine:\n", startLine)

    this.method = startLine[0]

    this.resource = startLine[1]

    const [protocol, version] = startLine[2].split("/")

    this.protocol =  protocol || this.protocol
    this.version =  version || this.protocol

    let line = lines.shift()
    // Empty line between Headers and Body
    while(line) {
      const [key, value] = line.split(": ")
      if (!key || !value ) {
        throw new Error("Request parse error")
      }

      this.headers[key] = value

      line = lines.shift()
    }

    this.body = lines.join(NEW_LINE)

    console.log(this)
  }
}
