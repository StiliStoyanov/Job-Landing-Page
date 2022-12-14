export interface User{
    id?: number, 
    username: string,
    email: string,
    password: string,
    appliedFor?: { [key: string]:  string;}
}