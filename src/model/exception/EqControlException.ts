export class EqControlException extends Error {
  constructor(message: string) {
    super(`An error occured when controlling EQ settings`);
  }
}
