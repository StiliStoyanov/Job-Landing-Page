import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    url = 'http://localhost:3000/users'

    constructor(private htpp: HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.htpp.get<User[]>(this.url)
    }

    login(username: string, password: string): Observable<any> {
        return this.getUsers().pipe(
            map((stream:User[])=> stream.find(user => user.username===username && user.password===password))
        )
    }   

    register(data: User): Observable<User>{
        return this.htpp.post<User>(this.url, data)
    }
}