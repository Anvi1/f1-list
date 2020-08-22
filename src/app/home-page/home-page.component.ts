import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DataService} from 'src/app/service/data.service';
import { Races } from 'src/app/models/races';
import { Winners } from 'src/app/models/winners';
import { DataConversionService} from 'src/app/service/data-conversion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  selectedYear: number;
  yearList = [];
  displayYearList = false;
  seasonRaces: Races[];
  raceWinners: Winners[];
  worldChampion: {};
  selectedCircuitId: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  winnersData: Array<{ year: number, circuitId: string, values: Winners[] }> = new Array();

  constructor( public dataService: DataService, public dataConversionService: DataConversionService) { }

  // Custom dropdown hides
  @HostListener('document:click', ['$event']) onDocumentClick(): void {
    this.displayYearList = false;
  }

  // Setting the values of years in dropdown list from 2005-15 and getting races of season 2005 by default
  ngOnInit(): void {
    let initYear = 2005;
    while (initYear <= 2015) {
      this.yearList.push(initYear);
      initYear++;
   }
    this.selectedYear = 2005;
    this.getSeasonRaces();
  }

  // Function to get data of selected season races
  getSeasonRaces(): void {
    this.dataService.getAllSeasonRacesData(this.selectedYear).pipe(takeUntil(this.destroy$)).subscribe((data: Races[]) => {

      // call dataconversion common service to fetch data according to required and clean format
      this.seasonRaces = this.dataConversionService.convertAllSeasonRacesData(data);
      this.getWorldChampion();

      // setting default circuit value for getting winners of selected race
      this.selectedCircuitId = this.seasonRaces[0].circuitId;
      this.getRaceWinners(this.selectedCircuitId);
    });
  }

  // Function to get winners of particular race
  getRaceWinners(circuit: string): void {
    this.dataService.getRaceWinnersData(this.selectedYear, circuit).pipe(takeUntil(this.destroy$)).subscribe((data: Winners[]) => {
      this.raceWinners = this.dataConversionService.convertRaceWinnersData(data);

      // Adding race winners data to common winners list of particular year and race.
      this.winnersData.push({year: this.selectedYear, circuitId: circuit, values: this.raceWinners});
    });
  }

  // Function to get world champion data
  getWorldChampion(): void{
    this.dataService.getSeasonWorldChampionData(this.selectedYear).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.worldChampion = this.dataConversionService.convertSeasonWorldChampionData(data)[0];
    });
  }

  onYearSelect(year: number): void {
    this.selectedYear = year;
    this.displayYearList = false;
    this.getSeasonRaces();
  }

  onRaceSelect(circuit: string): void{
    this.selectedCircuitId = circuit;

    // check if winners list of particular year and race already exists in winners data, if not call API of winners list
    const checkCircuitValueExists = this.winnersData.find(i => (i.circuitId === circuit && i.year === this.selectedYear));
    if (!checkCircuitValueExists){
      this.getRaceWinners(circuit);
    }
    else{
      this.raceWinners = checkCircuitValueExists.values;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
