export interface Course {
  id: number;
  name: string;
}
export interface Session {
  id: number;
  name: string;
}

export interface ReferSource {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userID?: number;
}
