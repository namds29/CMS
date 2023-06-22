export interface IClient {
    id: number;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    phone: string;
    address?: string;
    dateOfBirth?: string;
    status: string;
    intakeCenterName?: number;
    intakeCenterID?: number;
    lastCareTime?: string;
    userID?: number;
    addZaloFriend: number;
    moveToPrivateGroup: boolean;
    referSourceId: number;
    referSourceName: string;
    vistingDate: string;
    courseID: string;
    startingDate: string;
    responseStatusName: string
    nextCallDate: string,
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

export interface IDetailFormClient {
    name: string,
    phone: number,
    address: string,
    dateOfBirth?: string,
    addZaloFriend: boolean | null | undefined,
    moveToPrivateGroup: boolean | null | undefined,
    isDeleted: number,
    referSourceID: number
    clientHeathStatus: string,
    intakeCenterID: number,
    userID: number
}

export interface IUpdateFormClient {
    name?: string,
    phone?: number,
    address?: string,
    dateOfBirth?: string,
    addZaloFriend?: boolean | null,
    moveToPrivateGroup?: boolean | null,
    isDeleted?: number,
    referSourceID?: number,
    clientHeathStatus?: string,
    intakeCenterID?: number,
    userID?: number
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
    nextCallSchedule: null | string;
    note: null | string;
    responseStatusID: number;
    responseStatusName: string;
    sessionID: null | string;
    startingDate: string;
    updatedAt: string;
    userID: number;
    vistingDate: null | string;
}