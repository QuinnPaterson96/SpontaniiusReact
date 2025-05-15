import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps';
import { GoogleApiService } from '@/services/googleApiService';
import { GeocodingResponse } from '@/types/api';

/**
 * Check if location permission is granted.
 */
export async function hasLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

/**
 * Fetch user location using Expo Location.
 */
export async function fetchUserLocation(): Promise<LatLng> {
  const granted = await hasLocationPermission();

  if (!granted) {
    throw new Error('Location permissions not granted');
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

/**
 * Get location (LatLng) from an address string via Google Maps API.
 */
export async function getLocationFromAddress(address: string, apiKey: string): Promise<LatLng> {
  try {
    const response = await GoogleApiService.getLocationFromAddress(address, apiKey);
    const location = response.data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error('Error fetching location from address:', error);
    throw error;
  }
}

/**
 * Get address from coordinates using Google Maps API.
 */
export async function getAddressFromCoordinates(latLng: LatLng, apiKey: string): Promise<GeocodingResponse> {
  const latlng = `${latLng.latitude},${latLng.longitude}`;
  const response = await GoogleApiService.getAddressFromCoordinates(latlng, apiKey);
  return response.data;
}
