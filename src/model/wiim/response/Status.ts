/**
 * Generic interface for the WiiM status response
 * They do not used status codes, rather we have to do it this way
 */
export interface IGenericStatusWiimResponse {
  status: "OK" | "Failed";
}
