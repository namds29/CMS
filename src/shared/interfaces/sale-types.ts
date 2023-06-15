export interface IClient {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    phone: string;
    address?: string;
    dateOfBirth?: string;
    status: string;
    intakeCenter?: number;
    lastCareTime?: string;
    userID?: number;
    addZaloFriend: boolean;
    moveToPrivateGroup: boolean;
    referSource: number;
    vistingDate : string,
    courseID: string
}

export interface ICare {
    id: number;
    clientStatus: number;
    summary: string;
    nextCallSchedule?: string;
    createdAt: string;
    client: IClient;
    note?: string;
}


export interface ClientHeathHistory {
    id: number;
    status: string;
    clientID?: number;
    createdAt: Date;
    updatedAt: Date;
    userID?: number;
}

export interface ICreateFormClient {
    name: string,
    phone: number,
    address: string,
    dateOfBirth: string,
    referSource: number
    clientHeathStatus: string,
    userID: number
}

export interface ResponseStatus {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userID?: number;
}
export interface IClientCareHistories {
    centerID: null | number;
    clientID: number;
    content: string;
    courseID: null | number;
    createdAt: string;
    id: number;
    nextCallDate: null | string;
    note: null | string;
    responseStatus: number;
    sessionID: null | string;
    startingDate: string;
    updatedAt: string;
    userID: number;
    vistingDate: null | string;
  }