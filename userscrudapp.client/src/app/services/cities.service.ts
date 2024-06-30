import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";
import { City } from "../types/city.interface";


@Injectable({
    providedIn: 'root'
})


export class CitiesService {
    private baseAPIUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllCities(): Observable<City> {
        return this.http.get<City>(`${this.baseAPIUrl}/GetAll`);
    }
}