import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//    apiKey: process.env.REACT_APP_API_KEY,
//    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//    projectId: process.env.REACT_APP_PROJECT_ID,
//    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//    messagingSenderId: process.env.REACT_APP_MSGSENDER_ID,
//    appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
   apiKey: 'AIzaSyBZz6XJ6ZyKbaIYYw2Ll3FIdLvLoqltfM0',
   authDomain: 'react-http-3f0e3.firebaseapp.com',
   databaseURL: 'https://react-http-3f0e3-default-rtdb.firebaseio.com',
   projectId: 'react-http-3f0e3',
   storageBucket: 'react-http-3f0e3.appspot.com',
   messagingSenderId: '587720594',
   appId: '1:587720594:web:ba7ca9a08fdd546d01034b',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
