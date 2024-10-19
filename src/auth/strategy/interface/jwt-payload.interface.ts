// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
    sub: number;
    username: string;
    level?: string;
    role?: string; // Make sure 'role' is optional

  }