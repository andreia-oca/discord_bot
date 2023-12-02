import axios from 'axios';

export class GenezioQueue {
  static async push(webhook: string, body: any): Promise<void> {
    const payload = JSON.stringify(body);

    const headers = {
      Authorization: 'Bearer ' + process.env.QSTASH_TOKEN,
      'Content-Type': 'application/json',
    };

    axios
      .post(webhook, payload, { headers: headers })
      .catch((error) => {
        throw error;
      });
  }
}
