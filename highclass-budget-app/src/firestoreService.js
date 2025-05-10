// src/firestoreService.js
import { getFirestore, collection, getDocs, query, where, addDoc, deleteDoc, doc } from "firebase/firestore";
import { app } from "./firebase";

// Firestore setup
const db = getFirestore(app);

// ----- Firestore Transaction Functions -----

export const getUserTransactions = async (userId) => {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };

      export const addTransaction = async (transaction) => {
        return await addDoc(collection(db, "transactions"), transaction);
        };

        export const deleteTransaction = async (id) => {
          return await deleteDoc(doc(db, "transactions", id));
          };