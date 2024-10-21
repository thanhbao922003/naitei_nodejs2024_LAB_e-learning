import "express-session"; 

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

declare module "express-session" {
  interface SessionData {
    accessToken: string; 
    user: User;
  }
}