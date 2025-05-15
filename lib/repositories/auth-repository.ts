import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  AuthCredential,
  signOut
} from 'firebase/auth';

// Firebase config should be stored securely (via env or app constants)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  appId: 'YOUR_APP_ID',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const AuthRepository = {
  isUserSignedIn(): string | null {
    return auth.currentUser?.uid ?? null;
  },

  async handleGoogleSignInResult(idToken: string): Promise<string> {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      return userCredential.user?.uid ?? '';
    } catch (error) {
      console.error('Google sign-in failed', error);
      throw error;
    }
  },

  async signInWithFirebase(credential: AuthCredential): Promise<string | null> {
    try {
      const userCredential = await signInWithCredential(auth, credential);
      return userCredential.user?.uid ?? null;
    } catch (error) {
      console.error('Firebase sign-in failed', error);
      return null;
    }
  },

  signOut() {
    return signOut(auth);
  },
};
