import https from "https";
import axios from "axios";

// Used to ignore the self-signed certificate of the WiiM device
const axiosClient = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export class WiimHttpClient {
  baseUrl: string;

  constructor(playerIpAddress: string) {
    this.baseUrl = `https://${playerIpAddress}/httpapi.asp?command=`;
  }

  async doHttpAction<T>(actionName: string): Promise<T> {
    const requestUrl = this.baseUrl + actionName;
    console.log("Making HTTP request to: ", requestUrl);
    const response = await axiosClient.get(requestUrl);
    return response.data;
  }
}
