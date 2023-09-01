import nacl from "tweetnacl";

export class DiscordBot {

  async testDiscord(request) {
    console.log(request);

    const PUBLIC_KEY = 'e7125d2d1e7183f2b2df5d1fefc5d1567c8a50b0db589656ae47b492375b7365';

    const signature = request.headers['x-signature-ed25519'];
    const timestamp = request.headers['x-signature-timestamp'];
    const body = request.rawBody;

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );

    console.log("IsVerified: ", isVerified);

    if (!isVerified) {
      return json({ status: 401, error: 'invalid request signature' })
    }

    if (request.http.method === "POST") {

      if (request.body.type === 1) {
        console.log("PONG");
        return json({
          "type": 1,
        })
      }
      if (request.body.type === 2) {
        console.log("COMMAND");
        return json({
          "type": 4,
          "data": {
            "content": "Hello!",
          },
        })
      }

      return json({ status: 400, error: 'bad request' })
    }
  }
}
