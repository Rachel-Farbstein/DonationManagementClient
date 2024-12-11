export interface User {
    id?: number,
    cognitoUserId: string,
    cognitoUserName: string,
    Email: string
    phone: string,
    createdAt?: Date,
    isActive: boolean
}