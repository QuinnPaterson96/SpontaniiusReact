import { googlePlacesClient } from './axios-clients';
import { AutocompleteRequest } from '@/types/api';

export const PlacesApiService = {
  getAutocompleteResults: (
    fullUrl: string,
    request: AutocompleteRequest,
    apiKey: string
  ) =>
    googlePlacesClient.post(fullUrl, request, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.text.text',
      },
    }),

  getPlaceDetails: (
    placeId: string,
    apiKey: string,
    fieldMask = 'location,formattedAddress'
  ) =>
    googlePlacesClient.get(`places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
    }),
};
