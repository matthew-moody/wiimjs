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
    console.log("Making request to: ", this.baseUrl + actionName);
    const response = await axiosClient.get(this.baseUrl + actionName);
    return response.data;
  }
}
