import { db, collection, addDoc, getDocs, deleteDoc, doc } from "@/lib/firebase";

export const addFlashcard = async (userId, question, answer) => {
  try {
    const docRef = await addDoc(collection(db, "flashcards", userId, "cards"), {
      question,
      answer,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding flashcard:", error);
  }
};

export const getFlashcards = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "flashcards", userId, "cards"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return [];
  }
};

export const deleteFlashcard = async (userId, flashcardId) => {
  try {
    await deleteDoc(doc(db, "flashcards", userId, "cards", flashcardId));
  } catch (error) {
    console.error("Error deleting flashcard:", error);
  }
};