import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RaceHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(resp => {
        if (resp instanceof HttpResponse) {
          let formattedObject;

          // Intercept response of World Cahmpion API
          if (resp.body.MRData.StandingsTable){
            formattedObject = resp.body.MRData.StandingsTable.StandingsLists[0];
          }
          // Intercept response of season's races and winners
          else{
            formattedObject = resp.body.MRData.RaceTable.Races;
          }
          return  resp.clone({ body: formattedObject });
        }
      })
    );
  }
}
