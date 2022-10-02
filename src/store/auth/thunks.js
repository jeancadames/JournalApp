import { async } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = (email, passowrd) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ))

    }
}

export const startCreatingUserWithEmailPassowrd = ({email, password, displayName}) => {
    return async(dispatch)=>{
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch( login( {uid, displayName, email, photoURL} ));
    }
}

export const startLoginWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch)=>{

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await loginWithEmailPassword({email, password, displayName});

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));
    }

}

export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();

        dispatch(logout());
    }
}
