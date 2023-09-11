export class AuthError extends Error {
  constructor(message?: string) {
    super(message || 'access denied');
    super.name = 'AuthError';
  }
}
