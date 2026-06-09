import {makeAutoObservable} from 'mobx';

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  provider_user_id?: string;
  provider_profile_url?: string;
  provider: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: null;
  profile: null;
  session: null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

class AuthService {
  user = null;
  profile = null;
  session = null;
  isLoading = false;
  isAuthenticated = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async signInWithGoogle() {}
  async signInWithEmail(_email: string, _password: string) { return false; }
  async signUpWithEmail(_email: string, _password: string) { return false; }
  async signOut() {}
  async resetPassword(_email: string) { return false; }
  async updateProfile(_updates: Partial<Profile>) {}
  clearError() {}

  get authState(): AuthState {
    return {
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    };
  }
}

export const authService = new AuthService();
