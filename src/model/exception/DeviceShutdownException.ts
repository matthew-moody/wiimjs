export class DeviceShutdownException extends Error {
  constructor() {
    super("An error occured while shutting down the device.");
  }
}
