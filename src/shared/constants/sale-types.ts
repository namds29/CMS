
export interface Care {
    id: number;
    clientStatus: number;
    summary: string;
    nextCallSchedule?: Date;
    createdAt: Date;
    client: Client;
    note?: string;
  }
  
export interface HeathProgress {
    id: number;
    note: string;
    createdAt: Date;
}
export interface Client {
    id: number;
    name: string;
    phone: string;
    address?: string;
    dateOfBirth?: Date;
    type: number;
    care?: Care[];
    createdAt: Date;
    heathProgress?: HeathProgress[];
    addZaloFriend: boolean;
    moveToPrivateGroup: boolean;
    referSource: number;
}
