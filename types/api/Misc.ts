// Consolidated interfaces for Misc

export interface GooglePlacesModels {
  placeId: string;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
}