import { Injectable } from '@angular/core';
import { Races } from 'src/app/models/races';
import { Winners } from 'src/app/models/winners';

@Injectable({
  providedIn: 'root'
})
export class DataConversionService {
  convertAllSeasonRacesData(data: any): Races[]{
    const formattedObject = data.map((res: any) => {
      const returnObj = {
        season: res.season,
        raceName: res.raceName,
        circuitId: res.Circuit.circuitId
      };
      return returnObj;
    });
    return formattedObject;
  }

  convertRaceWinnersData(data: any): Winners[]{
    const formattedObject = data[0].Results.map((res: any) => {
      const returnObj = {
        driverInfo: res.Driver || '',
        position: res.position || '',
        laps: res.laps || '',
        grid: res.grid || '',
        time: res.Time || '',
        points: res.points || ''
      };
      return returnObj;
    });
    return formattedObject;
  }

  convertSeasonWorldChampionData(data: any): any[]{
    const formattedObject = data?.DriverStandings.map((res: any) => {
      const returnObj = {
        driverId: res.Driver.driverId,
        givenName: res.Driver.givenName || '',
        familyName: res.Driver.familyName || '',
        position: res.position,
        points: res.points,
        wins: res.wins
      };
      return returnObj;
    });
    return formattedObject;
  }
}
