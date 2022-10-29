import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Organization } from "./org.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    urlUsers = 'http://localhost:3000/users'
    urlOrg = 'http://localhost:3000/organizations'


    private hasLoggedIn$ = new BehaviorSubject<boolean>(false)

    constructor(private htpp: HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.htpp.get<User[]>(this.urlUsers)
    }
    getOrg(): Observable<Organization[]>{
        return this.htpp.get<User[]>(this.urlOrg)
    }

    loginUser(username: string, password: string): Observable<any> {
        return this.getUsers().pipe(
            map((stream:User[])=> stream.find(user => user.username===username && user.password===password))
        )
    }   
    loginOrg(username: string, password: string): Observable<any> {
        return this.getOrg().pipe(
            map((stream:Organization[])=> stream.find(org => org.username===username && org.password===password))
        )
    } 

    registerUser(data: User): Observable<User>{
        return this.htpp.post<User>(this.urlUsers, data)
    }
    registerOrg(data: Organization): Observable<Organization>{
        return this.htpp.post<User>(this.urlOrg, data)
    }

    logout(): void {
    localStorage.removeItem('loggedUser')
    localStorage.removeItem('loggedOrg')
    this.setHasLoggedIn(false)
    }

    setLoggedUser(user: User): void{
        localStorage.setItem('loggedUser', JSON.stringify(user))

        this.setHasLoggedIn(true)
    }
    setLoggedOrg(org: Organization): void{
        localStorage.setItem('loggedOrg', JSON.stringify(org))

        this.setHasLoggedIn(true)
    }

    getLoggedUser(): User{
        return JSON.parse(localStorage.getItem('loggedUser')!)
    }
    getLoggedOrg(): User{
        return JSON.parse(localStorage.getItem('loggedOrg')!)
    }
    setHasLoggedIn(hasLogged: boolean): void{
        this.hasLoggedIn$.next(hasLogged)
    }
    getHasLoggedIn(): Observable<boolean>{
        return this.hasLoggedIn$.asObservable();
    }
}