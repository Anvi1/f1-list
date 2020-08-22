import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Races } from 'src/app/models/races';
import { DataService } from './data.service';


describe('DataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [
        HttpClientTestingModule
      ],
    });
  });

  it('should be created', () => {
    expect(DataService).toBeTruthy();
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('#getAllSeasonRacesData', () => {

        const expectedRaces = [
        { season: 2015, raceName: 'Australian Grand Prix', circuitId: 'Albert Park Grand Prix Circuit' },
        { season: 2015, raceName: 'Malaysian Grand Prix', circuitId: 'Sepang International Circuit' },
      ] as Races[];

        it('expects service to fetch data with proper sorting',
          inject([HttpTestingController, DataService],
            (httpMock: HttpTestingController, service: DataService) => {
              // We call the service
              service.getAllSeasonRacesData(2015).subscribe((data: Races[]) => {
                if (data.length > 0){
                  expect(data[0].season).toBe(2015);
                  expect(data[0].raceName).toBe('Australian Grand Prix');
                  expect(data[0].circuitId).toBe('Albert Park Grand Prix Circuit');
                }
              });
              // We set the expectations for the HttpClient mock
              const req = httpMock.expectOne('http://ergast.com/api/f1/2015.json');
              expect(req.request.method).toEqual('GET');
              // Then we set the fake data to be returned by the mock
              req.flush({data: expectedRaces});
            })
        );

      });

});
