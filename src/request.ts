import simpleHttp from "simple-http"

import { NEW_LINE } from "./constants";

export class HTTPRequest implements simpleHttp.HTTPRequest {
  public method = "";

  public resource = "";

  public version = "";
  
  public protocol = "HTTP";

  public headers = {}

  public readonly body: string = '';

  constructor(requestString: string) {
    const { method, resource, version, protocol, headers, body } = this.parseRequestString(requestString)

    this.method = method
    this.resource = resource
    this.version = version
    this.protocol = protocol || this.protocol
    this.headers = headers || this.version
    this.body = body

    console.log(this)
  }

  private parseRequestString(requestString: string): simpleHttp.IRequestParsedData {
    const lines = requestString.split(NEW_LINE)

    if(lines.length <= 0 ) {
      throw new Error("Request parse error")
    }

    const startLine = lines.shift()?.split(" ")

    if(!startLine || !startLine[0] || !startLine[1] || !startLine[2]) {
      throw new Error("Request parse error")
    }
  
    const method = startLine[0]

    const resource = startLine[1]

    const [protocol, version] = startLine[2].split("/")

    let line = lines.shift()

    const headers: simpleHttp.Headers = {}

    while(line) {
      const [key, value] = line.split(": ")
      if (!key || !value ) {
        throw new Error("Request parse error")
      }

      headers[key] = value

      line = lines.shift()
    }

    const body = lines.join(NEW_LINE)

    return {
      method,
      resource,
      version: version || "",
      protocol: protocol || "",
      headers,
      body,
    }
  }
}
