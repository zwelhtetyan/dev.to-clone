import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyByMN0FI6BEaIfgsoMedZb1H6XpP2wngUM',
   authDomain: 'dev-community-43375.firebaseapp.com',
   projectId: 'dev-community-43375',
   storageBucket: 'dev-community-43375.appspot.com',
   messagingSenderId: '473919873639',
   appId: '1:473919873639:web:3cc09b56f7787d28a3eac2',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
