import { LatLng } from 'react-native-maps';
import { AutocompleteRequest, PlaceDetailsResponse, PlaceSuggestion } from '@/types/api';
import { PlacesApiService } from '@/services/places-api-service';
import { Circle, LatLngWrapper, LocationBias } from '@/types/api/places'; // if modularized
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetch autocomplete results from Google Places API.
 */
export async function fetchAutocomplete(
  query: string,
  location: LatLng | null,
  apiKey: string
): Promise<PlaceSuggestion[]> {
  if (query.length < 3) {
    return [];
  }

  const locationBias: LocationBias | null = location
    ? {
        circle: {
          center: { latitude: location.latitude, longitude: location.longitude },
          radius: 50000.0,
        },
      }
    : null;

  const request: AutocompleteRequest = {
    input: query,
    locationBias,
    sessionToken: generateSessionToken(),
  };

  try {
    const response = await PlacesApiService.getAutocompleteResults(
      'https://places.googleapis.com/v1/places:autocomplete',
      request,
      apiKey
    );
    return response.data.suggestions;
  } catch (error: any) {
    console.error('PlacesRepository API call failed:', error?.message || error);
    return [];
  }
}

/**
 * Fetch full place details by place ID.
 */
export async function getPlaceDetails(placeId: string, apiKey: string): Promise<PlaceDetailsResponse> {
  const response = await PlacesApiService.getPlaceDetails(placeId, apiKey);
  return response.data;
}

/**
 * Generate a session token (UUID).
 */

function generateSessionToken(): string {
  return uuidv4();
}
