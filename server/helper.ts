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


// const url =
//   `https://qstash.upstash.io/v2/publish/${queueUrl}`;
// const data = {
//   webhook_token: request.body.token,
//   query_param: query_param,
// };

// const headers = {
//   Authorization: 'Bearer ' + process.env.QSTASH_TOKEN,
//   'Content-Type': 'application/json',
// };

// axios
//   .post(url, data, { headers: headers })
//   .then((res) => {
//     console.log(`statusCode: ${res.status}`);
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
