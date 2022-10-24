import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
        return this.http.put(this.url, offer)
    }
}