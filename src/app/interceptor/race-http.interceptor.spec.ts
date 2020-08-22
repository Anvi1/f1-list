import { TestBed, inject } from '@angular/core/testing';

import { RaceHttpInterceptor } from './race-http.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from '../service/data.service';
import { Races } from '../models/races';


describe('RaceHttpInterceptor', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RaceHttpInterceptor,
          multi: true,
        },
      ],
    });

  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(RaceHttpInterceptor).toBeTruthy();
  });

  describe('#getAllSeasonRacesData', () => {

  const expectedRaces = {
      RaceTable: {
        Races: [
          {
            Circuit: {
              circuitId: 'albert_park'
            },
            date: '2005-03-06',
            raceName: 'Australian Grand Prix',
            round: '1',
            season: '2005',
            time: '14:00:00Z',
            url: 'http://en.wikipedia.org/wiki/2005_Australian_Grand_Prix'
          },
          {
            Circuit: {
              circuitId: 'albert_park'
            },
            date: '2005-03-06',
            raceName: 'Australian Grand Prix',
            round: '1',
            season: '2005',
            time: '14:00:00Z',
            url: 'http://en.wikipedia.org/wiki/2005_Australian_Grand_Prix'
          }
        ],
        season: '2015'
      }
  };

  it('expects service to fetch data with proper sorting',
    inject([HttpTestingController, DataService],
      (httpMock: HttpTestingController, service: DataService) => {
        // We call the service
        service.getAllSeasonRacesData(2015).subscribe((data: Races[]) => {
           const dataLength = data.length;
           expect(dataLength).toEqual(2);
        });
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne('http://ergast.com/api/f1/2015.json');
        expect(req.request.method).toEqual('GET');
        // Then we set the fake data to be returned by the mock
        req.flush({MRData: expectedRaces});
      })
  );

});

});
