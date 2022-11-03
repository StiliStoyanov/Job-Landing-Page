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


    private hasLoggedInUser$ = new BehaviorSubject<boolean>(false)
    private hasLoggedInOrg$ = new BehaviorSubject<boolean>(false)


    constructor(private http: HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.urlUsers)
    }
    getOrg(): Observable<Organization[]>{
        return this.http.get<User[]>(this.urlOrg)
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
        return this.http.post<User>(this.urlUsers, data)
    }
    registerOrg(data: Organization): Observable<Organization>{
        return this.http.post<User>(this.urlOrg, data)
    }

    logout(): void {
    localStorage.removeItem('loggedUser')
    localStorage.removeItem('loggedOrg')
    this.setHasLoggedInUser(false)
    this.setHasLoggedInOrg(false)

    }

    setLoggedUser(user: User): void{
        localStorage.setItem('loggedUser', JSON.stringify(user))

        this.setHasLoggedInUser(true)
    }
    setLoggedOrg(org: Organization): void{
        localStorage.setItem('loggedOrg', JSON.stringify(org))

        this.setHasLoggedInOrg(true)
    }

    getLoggedUser(): User{
        return JSON.parse(localStorage.getItem('loggedUser')!)
    }
    getLoggedOrg(): Organization{
        return JSON.parse(localStorage.getItem('loggedOrg')!)
    }
    setHasLoggedInUser(hasLogged: boolean): void{
        this.hasLoggedInUser$.next(hasLogged)
    }
    getHasLoggedInUser(): Observable<boolean>{
        return this.hasLoggedInUser$.asObservable();
    }
    setHasLoggedInOrg(hasLogged: boolean): void{
        this.hasLoggedInOrg$.next(hasLogged)
    }
    getHasLoggedInOrg(): Observable<boolean>{
        return this.hasLoggedInOrg$.asObservable();
    }
    updateUser(user:User): Observable<any>{
        const url = `${this.urlUsers}/${user.id}`
        return this.http.put(url, user)
    }
    updateOrg(org:Organization): Observable<any>{
        const url = `${this.urlOrg}/${org.id}`
        return this.http.put(url, org)   
    }
    deleteUser(id:number):Observable<any>{
        const url = `${this.urlUsers}/${id}`
        return this.http.delete(url)
    }
    deleteOrg(id:number):Observable<any>{
        const url = `${this.urlOrg}/${id}`
        console.log(url);
        
        return this.http.delete(url)
    }
    // apply(offerId: number):Observable<any>{
       
    // }
}