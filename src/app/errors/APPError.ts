export class APPError extends Error {
  constructor(message: string) {
    super(message);
    super.name = 'APPError';
  }
}
