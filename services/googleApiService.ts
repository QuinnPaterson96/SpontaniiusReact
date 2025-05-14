import { googleMapsClient } from './axiosClients';

export const GoogleApiService = {
  getLocationFromAddress: (address: string, apiKey: string) =>
    googleMapsClient.get('maps/api/geocode/json', {
      params: { address, key: apiKey },
    }),

  getDirections: (origin: string, destination: string, apiKey: string) =>
    googleMapsClient.get('maps/api/directions/json', {
      params: { origin, destination, key: apiKey },
    }),

  getAddressFromCoordinates: (latlng: string, apiKey: string) =>
    googleMapsClient.get('maps/api/geocode/json', {
      params: { latlng, key: apiKey },
    }),
};
