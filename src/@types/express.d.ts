declare namespace Express {
  export interface Request {
    user: {
      id_user: string;
      permissions: Array<string>;
    };
  }
}
