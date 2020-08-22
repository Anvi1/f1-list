import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Races } from '../models/races';

import { DataConversionService } from './data-conversion.service';
import { Winners } from '../models/winners';

describe('DataConversionService', () => {
  let service: DataConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(DataConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convertAllSeasonRacesData', () => {
    it('should return formatted season races data', () => {
      const testData = [
        {
          Circuit: {
            circuitId: 'circuitIdTest',
            circuitName: 'circuitNameTest'
          },
          date: '2006-03-12',
          raceName: 'Bahrain Grand Prix',
          round: '1',
          season: 2006,
          time: '14:30:00Z',
          url: 'http://en.wikipedia.org/wiki/2006_Bahrain_Grand_Prix'
        }
      ];

      const expectedData = [
        {
          season: 2006,
          raceName: 'Bahrain Grand Prix',
          circuitId: 'circuitIdTest',
        }
      ]as Races[];

      const formattedData = service.convertAllSeasonRacesData(testData);
      expect(formattedData[0].season).toBe(expectedData[0].season);
      expect(formattedData[0].raceName).toBe(expectedData[0].raceName);
      expect(formattedData[0].circuitId).toBe(expectedData[0].circuitId);
    });

  });

  describe('convertRaceWinnersData', () => {
    it('should return formatted race winners data', () => {
      const testData = [{
        Results: [{
          Driver: {
            driverId: 'michael_schumacher',
            familyName: 'Schumacher',
            givenName: 'Michael'
          },
          position: '1',
          laps: '62',
          grid: '10',
          Time: {
            time: '1:31:06.486'
          },
          points: '20'
        }]
      }];

      const expectedData = [
        {
          driverInfo: {
            driverId: 'michael_schumacher',
            familyName: 'Schumacher',
            givenName: 'Michael',
          },
          grid: '10',
          laps: '62',
          points: '20',
          position: '1',
          time: {
            time: '1:31:06.486'
          }
        }
      ]as Winners[];

      const formattedData = service.convertRaceWinnersData(testData);
      expect(formattedData[0].driverInfo.familyName).toBe(expectedData[0].driverInfo.familyName);
      expect(formattedData[0].driverInfo.givenName).toBe(expectedData[0].driverInfo.givenName);
      expect(formattedData[0].driverInfo.driverId).toBe(expectedData[0].driverInfo.driverId);
      expect(formattedData[0].position).toBe(expectedData[0].position);
      expect(formattedData[0].laps).toBe(expectedData[0].laps);
      expect(formattedData[0].grid).toBe(expectedData[0].grid);
      expect(formattedData[0].time.time).toBe(expectedData[0].time.time);
      expect(formattedData[0].points).toBe(expectedData[0].points);
    });

  });

  describe('convertSeasonWorldChampionData', () => {
    it('should return formatted season world champion data', () => {
      const testData = {
        DriverStandings: [{
          Driver: {
            driverId: 'michael_schumacher',
            familyName: 'Schumacher',
            givenName: 'Michael'
          },
          position: '1',
          points: '20',
          wins: '7'
        }]
      };

      const expectedData = [
        {
          driverId: 'michael_schumacher',
          givenName: 'Michael',
          familyName: 'Schumacher',
          position: '1',
          points: '20',
          wins: '7'
        }
      ];

      const formattedData = service.convertSeasonWorldChampionData(testData);
      expect(formattedData[0].driverId).toBe(expectedData[0].driverId);
      expect(formattedData[0].givenName).toBe(expectedData[0].givenName);
      expect(formattedData[0].familyName).toBe(expectedData[0].familyName);
      expect(formattedData[0].position).toBe(expectedData[0].position);
      expect(formattedData[0].points).toBe(expectedData[0].points);
      expect(formattedData[0].wins).toBe(expectedData[0].wins);
    });

  });


});
