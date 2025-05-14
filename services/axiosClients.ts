import axios from 'axios';

export const appClient = axios.create({
  baseURL: 'https://fgvdpt3hht.us-east-1.awsapprunner.com',
  timeout: 10000,
});

export const googleMapsClient = axios.create({
  baseURL: 'https://maps.googleapis.com/',
  timeout: 10000,
});

export const googlePlacesClient = axios.create({
  baseURL: 'https://places.googleapis.com/v1/',
  timeout: 10000,
});
