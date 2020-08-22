export interface Winners {
  driverInfo:{
    driverId: string,
    familyName: string,
    givenName: string
  };
  position: string;
  laps: string;
  grid: string;
  time: {
    time: string;
  };
  points: string;
}