import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const add = async (path: string, data: Object) => {
  try {
    return await addDoc(collection(db, path), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export default firebase;
