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

export const get = async (path: string, userId: string) => {
  try {
    const postQuery = query(
      collection(db, path),
      where('userId', '==', userId),
      orderBy('created', 'desc')
    );

    const querySnapshot = await getDocs(postQuery);

    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }, []);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const Remove = async (path: string, id: string) => {
  try {
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const Edit = async (path: string, id: string, data: any) => {
  try {
    const docRef = doc(db, path, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error adding document: ', error);

    return error;
  }
};

export const getOne = async (path: string, id: string) => {
  try {
    const docRef = doc(db, path, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        createdFormated: format(new Date(), 'dd MMMM yyyy', { locale: ptBR }),
        ...docSnap.data(),
      };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
export default firebase;
