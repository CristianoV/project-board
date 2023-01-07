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
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDZWrayOlVgCPoSh4tlBoNGSqVPT9wBYno',
  authDomain: 'boardapp-918c4.firebaseapp.com',
  projectId: 'boardapp-918c4',
  storageBucket: 'boardapp-918c4.appspot.com',
  messagingSenderId: '541431185978',
  appId: '1:541431185978:web:62217f4e74b59462262b03',
  measurementId: 'G-6JB4L50L4W',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const add = async (path: string, data: Object, key = 'null') => {
  try {
    if (key === 'null') return await addDoc(collection(db, path), data)

    await setDoc(doc(db, path, key), data);
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

export const getUsers = async (user = 'null') => {
  try {
    if (user !== 'null') {
      const docRef = doc(db, 'users', user);
      const docSnap = (await getDoc(docRef)) as {
        exists: () => any;
        data: () => any;
        id: string;
      };

      return {
        id: docSnap.id,
        lastDonate: docSnap.data()?.lastDonate,
        ...docSnap.data(),
      };
    }

    const postQuery = query(collection(db, 'users'));
    const querySnapshot = await getDocs(postQuery);

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        lastDonate: doc.data()?.lastDonate,
        ...doc.data(),
      };
    });
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
