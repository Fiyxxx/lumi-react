"use client";
import { useEffect, useState } from "react";
import { addFlashcard, getFlashcards, deleteFlashcard } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function FlashcardsPage() {
  const [user] = useAuthState(auth);
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (user) {
      fetchFlashcards();
    }
  }, [user]);

  const fetchFlashcards = async () => {
    if (!user) return;
    const data = await getFlashcards(user.uid);
    setFlashcards(data);
  };

  const handleAddFlashcard = async () => {
    if (!user || !question || !answer) return;
    await addFlashcard(user.uid, question, answer);
    setQuestion("");
    setAnswer("");
    fetchFlashcards();
  };

  const handleDelete = async (id) => {
    if (!user) return;
    await deleteFlashcard(user.uid, id);
    fetchFlashcards();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Flashcards</h1>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddFlashcard}>
          Add
        </button>
      </div>
      <ul className="mt-4">
        {flashcards.map((card) => (
          <li key={card.id} className="border p-2 flex justify-between items-center">
            <span>{card.question} → {card.answer}</span>
            <button className="text-red-500" onClick={() => handleDelete(card.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}