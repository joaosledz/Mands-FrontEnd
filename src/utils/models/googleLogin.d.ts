import GoogleLogin from 'react-google-login';

declare module 'react-google-login' {
    export interface GoogleLoginResponseOffline {
        readonly code: string;
        profileObj: undefined;
    }
}
