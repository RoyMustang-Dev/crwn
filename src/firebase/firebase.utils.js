import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAzNPMxn4Zl-CE0R5okIbfcwQ50TfPqL-g",
  authDomain: "crwn-db-77d0a.firebaseapp.com",
  databaseURL: "https://crwn-db-77d0a.firebaseio.com",
  projectId: "crwn-db-77d0a",
  storageBucket: "crwn-db-77d0a.appspot.com",
  messagingSenderId: "507203984982",
  appId: "1:507203984982:web:691c9025da6328bc9825f7",
  measurementId: "G-THM9TVYSJG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
