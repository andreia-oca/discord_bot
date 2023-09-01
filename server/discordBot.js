import nacl from "tweetnacl";

export class DiscordBot {

  async testDiscord(request) {
    const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

    const signature = request.headers['x-signature-ed25519'];
    const timestamp = request.headers['x-signature-timestamp'];
    const body = request.rawBody;

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );

    console.log("Request IsVerified: ", isVerified);

    if (!isVerified) {
      return {
        body: { "error": "invalid request signature" },
        headers: {"content-type": "application/json" },
        statusCode: "401",
      }
    }

    if (request.http.method === "POST") {

      if (request.body.type === 1) {
        console.log("PING message received");
        return {
          body: {
            "type": 1
          },
          headers: {"content-type": "application/json" },
          statusCode: "200",
        }
      }
      if (request.body.type === 2) {
        console.log("COMMAND message received");

        console.log("Command: ", request);

        const query_param = request.body.data.options[0].value;
        return {
          body: {
            "type": 4,
            "data": {
              "content": `Hello, ${query_param}!`
            },
          },
          headers: {"content-type": "application/json" },
          statusCode: "200",
        }
      }
    }
  }
}
