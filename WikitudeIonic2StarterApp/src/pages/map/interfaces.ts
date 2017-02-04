export interface IPoint {
  lat: number;
  lng: number;
}

export interface IMarker extends IPoint {
  id: number;
  label?: string;
}
