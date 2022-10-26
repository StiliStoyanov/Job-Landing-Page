import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { map } from "rxjs/operators";

export class AuthService{
    url = 'http://localhost:3000/users'

    constructor(private htpp: HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.htpp.get<User[]>(this.url)
    }

    // login(username: string, password: string): Observable<User | null | undefined> {
    //     return this.getUsers().pipe(
    //         map((stream:User[])=>)
    //     )
    // }   
    //TODO: alternative of find() / fix 
}