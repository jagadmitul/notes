import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "../compontents/ListItem";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);

  const getNotes = () => {
    axios.get("/api/notes/").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    getNotes();
  }, [count]);

  return (
    <div className="pb-16 pt-4 min-h-[80vh] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-4 notes">
      <ListItem new />
      {notes.map((note, index) => (
        <ListItem key={index} count={count} setCount={setCount} note={note} />
      ))}
    </div>
  );
};

export default NotesListPage;
