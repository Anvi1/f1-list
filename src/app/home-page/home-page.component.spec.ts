import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Winners } from '../models/winners';


describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle document click', () => {
    component.displayYearList = true;
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.displayYearList).toBe(false);
  });

  describe('getSeasonRaces', () => {
    it('should make a call to dataService.getAllSeasonRacesData()', () => {
      spyOn(component.dataService, 'getAllSeasonRacesData').and.callThrough();
      component.getSeasonRaces();
      expect(component.dataService.getAllSeasonRacesData).toHaveBeenCalled();
    });

  });

  describe('getRaceWinners', () => {
    it('should make a call to dataService.getRaceWinnersData()', () => {
      spyOn(component.dataService, 'getRaceWinnersData').and.callThrough();
      component.getRaceWinners('testId');
      expect(component.dataService.getRaceWinnersData).toHaveBeenCalled();
    });
  });

  describe('getWorldChampion', () => {
    it('should make a call to dataService.getSeasonWorldChampionData()', () => {
      spyOn(component.dataService, 'getSeasonWorldChampionData').and.callThrough();
      component.getWorldChampion();
      expect(component.dataService.getSeasonWorldChampionData).toHaveBeenCalled();
    });
  });

  describe('onYearSelect', () => {
    it('should save value in selected year', () => {
      const year = 2012;
      component.onYearSelect(year);
      expect(component.selectedYear).toBe(2012);
    });

    it('should set displayYearList false', () => {
      component.onYearSelect(2012);
      expect(component.displayYearList).toBe(false);
    });

    it('should make a call to getSeasonRaces()', () => {
      spyOn(component, 'getSeasonRaces').and.callThrough();
      component.onYearSelect(2012);
      expect(component.getSeasonRaces).toHaveBeenCalled();
    });
  });

  describe('onRaceSelect', () => {
    it('should save value in selectedCircuitId', () => {
      const circuitId = 'test';
      component.onRaceSelect(circuitId);
      expect(component.selectedCircuitId).toBe(circuitId);
    });

    it('should check if race winners data exists and populate to raceWinners array', () => {
      let winnersData: Array<{ year: 2005, circuitId: 'test', values: any }> = new Array();
      winnersData = [
        {
          year: 2005,
          circuitId: 'test',
          values: [
            {
              driverInfo: {
                driverId: 'testDriver'
              }
            }
          ]
        }
      ]

      const expectedData = [
        {
          driverInfo: {
            driverId: 'testDriver',
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
      component.onRaceSelect('test');
      expect(expectedData[0].driverInfo.driverId).toBe(winnersData[0].values[0].driverInfo.driverId);
    });

    it('should make a call to getRaceWinners()', () => {
      spyOn(component, 'getRaceWinners').and.callThrough();
      component.onRaceSelect('test');
      expect(component.getRaceWinners).toHaveBeenCalled();
    });
  });

});
