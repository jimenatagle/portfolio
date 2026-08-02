import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);
const db = isFirebaseConfigured ? getFirestore(initializeApp(firebaseConfig)) : null;

export async function fetchLikes(projectId) {
  if (!db) return null;

  const snapshot = await getDoc(doc(db, "project-likes", projectId));
  return snapshot.exists() ? snapshot.data().count || 0 : 0;
}

export async function addLike(projectId) {
  if (!db) return;

  const reference = doc(db, "project-likes", projectId);
  const snapshot = await getDoc(reference);

  if (snapshot.exists()) {
    await updateDoc(reference, { count: increment(1) });
  } else {
    await setDoc(reference, { count: 1 });
  }
}
