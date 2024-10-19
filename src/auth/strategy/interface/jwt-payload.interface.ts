// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
    sub: number;
    username: string;
    level?: string;
  }