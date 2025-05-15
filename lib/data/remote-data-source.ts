import ApiService from '@/services/api-service';
import { GoogleApiService } from '@/services/google-api-service';
import { PlacesApiService } from '@/services/places-api-service';

export const RemoteDataSource = {
  app: ApiService,
  google: GoogleApiService,
  places: PlacesApiService,
};
