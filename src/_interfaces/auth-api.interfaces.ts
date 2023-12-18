export interface LoginReqI {
  email: string;
  password: string;
}

export interface UserI {
  id: string;
  email: string;
  operatingAreaId: string;
  name: string;
  socketId: string;
  isOnline: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LoginResI {
  token: string;
  user: UserI;
}
