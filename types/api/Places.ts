// 📌 Request Model
export interface AutocompleteRequest {
  input: string;
  sessionToken: string;
  locationBias?: LocationBias; // ✅ Optional
}

// 📌 Location Bias Model
export interface LocationBias {
  circle: Circle;
}

// 📌 Circle Model
export interface Circle {
  center: LatLngWrapper;
  radius: number; // in meters
}

// 📌 LatLng Wrapper
export interface LatLngWrapper {
  latitude: number;
  longitude: number;
}

// 📌 Response Model
export interface AutocompleteResponse {
  suggestions: PlaceSuggestion[];
}

export interface PlaceSuggestion {
  placePrediction: PlacePrediction;
}

export interface PlacePrediction {
  placeId: string;
  text: PlaceText;
}

export interface PlaceText {
  text: string; // Full location name
}

export interface PlaceDetailsRequest {
  placeId: string;
}

export interface PlaceDetailsResponse {
  location: LocationData;
  formattedAddress: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
}
