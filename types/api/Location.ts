// Consolidated interfaces for Location

export interface GeocodingResponse {
  results: any[] | null;
  status: string;
}

export interface GoogleMapsResponse {
  results: any[];
}