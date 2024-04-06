import React from "react";
import moment from 'moment'
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import axios from "axios";

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const getTitle = (note) => {
  let title = note.body.split("\n")[0];
  if (title.length > 30) {
    return title.slice(0, 30);
  }
  return title;
};

let getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll(title, '')

  if (content.length > 45) {
    return content.slice(0, 55) + '...'
  } else {
    return content
  }
}

const ListItem = ({ note, count, setCount }) => {

  /* eslint-disable no-restricted-globals */
  const deleteNote = (noteId) => {
    if (confirm("Are you sure, you want to delete this note?")) {
      axios.delete(`/api/notes/${noteId}/`).then((response) => {
        setCount(count + 1)
        alert("Note deleted successfully!")
      });
    }
  };
  /* eslint-disable no-restricted-globals */

  return (
    <>
      {note ? (
        <div className="text-lg  aspect-square  rounded hover:bg-slate-900">
          <section className=" p-3 md:p-5 h-full flex flex-col justify-between ">
            <section>
              <section className="text-base md:text-lg">{getTitle(note)}</section>
              <section className="text-sm md:text-base text-gray-800 mt-1 md:mt-3">{getContent(note)}</section>
            </section>
            <section className="flex justify-between">
              <section className="text-xs md:text-sm text-gray-700">{moment(note.updated).fromNow()}</section>
              <section className="flex space-x-2">
                <Link to={`/note/${note.id}`}><HiPencilAlt /></Link>
                <button onClick={() => deleteNote(note.id)}><MdDelete /></button>
              </section>
            </section>
          </section>
        </div>
      ) : (
        <div className="text-lg aspect-square rounded  hover:bg-slate-900 flex items-center justify-center">
          <Link className=" h-full w-full" to={`/note/new`}>
            <section className="flex justify-center h-full w-full">
              <GrAdd color="white" className="text-3xl my-auto" />
            </section>
          </Link>
        </div>
      )}
    </>
  );
};

export default ListItem;
