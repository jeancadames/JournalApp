import { async } from '@firebase/util';
import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';
import { fireBaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNote, setSaving, updateNote, setPhotoToActiveNote, deleteNoteById } from './';

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
        
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }
        const newDoc = doc(collection( fireBaseDB, `${uid}/journal/notes` ));
        await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id;

        //dispatch
        dispatch(addNewEmptyNote(newNote));
       
        dispatch(setActiveNote(newNote));


    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNote(notes));
    }
}

export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc(fireBaseDB, `${uid}/journal/notes/${note.id}`);
        // el objeto de merge funciona para combinar los campos que son iguales en firebase
        await setDoc(docRef, noteToFirestore,{merge: true});      
        
        dispatch(updateNote(note));

    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {

        dispatch(setSaving());

        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        //el Promise.All dispara todas las promesas y da la respuesta de todas
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotoToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(fireBaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))

    }
}