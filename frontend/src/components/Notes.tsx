// src/components/Notes.tsx
import React, { useEffect, useState } from "react";
import { getNotes, addNote, logout } from "../api";

interface Note {
  id: number;
  text: string;
  timeStamp: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch {
      setError("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!text.trim()) return;
    try {
      await addNote(text);
      setText("");
      fetchNotes();
    } catch {
      setError("Error adding note");
    }
  };

  return (
    <div>
      <h2>My Notes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={logout}>Logout</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text} — <em>{new Date(note.timeStamp).toLocaleString()}</em>
          </li>
        ))}
      </ul>
      <input
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default Notes;
