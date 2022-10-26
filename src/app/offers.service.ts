import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { Offer } from "./offer.interface";


@Injectable({
    providedIn: 'root'
})

export class OffersService{

    url = 'http://localhost:3000/offers';
    constructor(private http: HttpClient){

    }
    getOffers(): Observable<Offer[]>{
        return this.http.get<Offer[]>(this.url)
    }

    createOffer(offer: Offer): Observable<any>{
        return this.http.post(this.url, offer)
    }
    updateOffer(offer:Offer): Observable<any>{
        const url = `${this.url}/${offer.id}`
        console.log(offer);
        
        return this.http.put(url, offer)
        
        
    }
    deleteOffer(id:number):Observable<any>{
        const url = `${this.url}/${id}`
        return this.http.delete(url)
    }
    getOffer(id:number): Observable<Offer>{

        const url = `${this.url}/${id}`;
        return this.http.get<Offer>(url)
    }
}