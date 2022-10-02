import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { fireBaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(fireBaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        }
    }

}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {

        try {
            // funcion para exportar usuarios de firebase
            const resp = await createUserWithEmailAndPassword(fireBaseAuth, email, password);
            const {uid, photoURL} = resp.user;
            
            //esta es una funcion propia de firebase que se utiliza para actualizar el perfil del usuario
            //fireBaseAuth.currentUser se utiliza para seleccionar el usuario de este momento
            await updateProfile(fireBaseAuth.currentUser, {displayName});


            return{
                ok:true,
                uid, photoURL, email, displayName
            }


        } catch (error) {
            // console.log(error);
            return {ok: false, errorMessage: error.message}
        }
}

export const loginWithEmailPassword = async({email, password, displayName}) => {

    try {

        const resp = await signInWithEmailAndPassword(fireBaseAuth, email, password);

        const {uid, photoURL} = resp.user;

        return{
            ok:true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return{ok: false, errorMessage: error.message}
    }

}

export const logoutFirebase = async() => {

    return await fireBaseAuth.signOut();

}