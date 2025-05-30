import * as jwt from 'jsonwebtoken';

export class AuthService {
  private jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  verifyToken(token: string): any {
    try {
      const payload = jwt.verify(token, this.jwtSecret);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

