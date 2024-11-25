
export interface AuthState {
   
    user: any | null; 
    loading: boolean;
    error: string | null;
    jwt: string | null;
}