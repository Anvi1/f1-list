import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Races } from 'src/app/models/races';
import { Winners } from 'src/app/models/winners';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  f1Url = 'http://ergast.com/api/f1/';
  constructor(private http: HttpClient) { }

  getAllSeasonRacesData(year: number ): Observable<any> {
    return this.http.get<Races[]>(this.f1Url + year + '.json').pipe(
      catchError(this.handleError)
    );
  }

  getRaceWinnersData(year: number, circuit: string ): Observable<any> {
    return this.http.get<Winners[]>(this.f1Url + year + '/circuits/' + circuit + '/results.json?limit=5').pipe(
      catchError(this.handleError)
    );
  }

  getSeasonWorldChampionData(year: number): Observable<any> {
    return this.http.get<any>(this.f1Url + year + '/driverStandings/1.json').pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): any {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
