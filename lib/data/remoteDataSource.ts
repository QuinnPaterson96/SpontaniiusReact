import { ApiService } from '@/services/ApiService';
import { GoogleApiService } from '@/services/GoogleApiService';
import { PlacesApiService } from '@/services/placesApiService';

export const RemoteDataSource = {
  app: ApiService,
  google: GoogleApiService,
  places: PlacesApiService,
};
