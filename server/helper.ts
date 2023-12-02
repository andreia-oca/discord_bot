import axios from 'axios';

export type GenezioEndpoint = {
  classname?: string;
  methodname: string;
}

export class GenezioQStashQueue {
  qstashToken: string;

  constructor(qstashToken: string) {
    this.qstashToken = qstashToken;
  }

  async push(webhook: string, body: any): Promise<void> {
    const payload = JSON.stringify(body);

    const headers = {
      Authorization: 'Bearer ' + this.qstashToken,
      'Content-Type': 'application/json',
    };

    axios
      .post(webhook, payload, { headers: headers })
      .catch((error) => {
        throw error;
      });
  }

  // Experimental
  async pushToTopic(topic: string, body: any): Promise<void> {
    const url = 'https://qstash.upstash.io/v2/publish/' + topic;
    const payload = JSON.stringify(body);

    const headers = {
      Authorization: 'Bearer ' + this.qstashToken,
      'Content-Type': 'application/json',
    };

    axios
      .post(url, payload, { headers: headers })
      .catch((error) => {
        throw error;
      });
  }

  // Experimental
  async pushToKafka(kafka: string, body: any): Promise<void> {
    const url = 'https://qstash.upstash.io/v2/publish/' + kafka;
    const payload = JSON.stringify(body);

    const headers = {
      Authorization: 'Bearer ' + this.qstashToken,
      'Content-Type': 'application/json',
    };

    axios
      .post(url, payload, { headers: headers })
      .catch((error) => {
        throw error;
      });
  }

  // Experimental
  // Proposal: All classes set a process env variable called GNZ_FUNCTION_URL
  // Locally GNZ_FUNCTION_URL is set to https:127.0.0.1:8083
  async pushToClass(endpoint:GenezioEndpoint, body: any): Promise<void> {
    const webhook = 'https://qstash.upstash.io/v2/publish/' + process.env.GNZ_FUNCTION_ID + '/' + endpoint.classname + '/' + endpoint.methodname;
    const payload = JSON.stringify(body);

    const headers = {
      Authorization: 'Bearer ' + this.qstashToken,
      'Content-Type': 'application/json',
    };

    axios
      .post(webhook, payload, { headers: headers })
      .catch((error) => {
        throw error;
      });
  }
}
