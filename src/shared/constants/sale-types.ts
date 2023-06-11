
export interface ICare {
    id: number;
    clientStatus: number;
    summary: string;
    nextCallSchedule?: string;
    createdAt: string;
    client: IClient;
    note?: string;
  }
  
export interface IHeathProgress {
    id: number;
    note: string;
    createdAt: string;
}
export interface IClient {
    id: number;
    name: string;
    phone: string;
    address?: string;
    dateOfBirth?: string;
    type: number;
    care?: ICare[];
    lastCareTime?: string;
    status: number;
    createdAt: string;
    heathProgress?: IHeathProgress[];
    addZaloFriend: boolean;
    moveToPrivateGroup: boolean;
    referSource: number;
}
export interface ICreateFormClient {
    name: string,
    phone: number,
    address: string,
    dateOfBirth: string,
    referSource: number
}