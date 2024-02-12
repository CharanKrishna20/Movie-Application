import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../models/country';
import { Console } from 'console';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  
  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
    })
    };

  getCountry(): Observable<Country[]>{
    return this.http.get<Country[]>('https://api.countrystatecity.in/v1/countries', {headers: this.httpOptions.headers})
  }
  getStateOfSelectedCountry(countryIso: string): Observable<any>{
    console.log(countryIso);
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`,{headers: this.httpOptions.headers} )

  }

  getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any>{
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`, {headers: this.httpOptions.headers} )
  }

}
