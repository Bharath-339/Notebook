import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const intitialNotes = [];

  const [notes, setnotes] = useState(intitialNotes);

  const host = "http://localhost:8000";


  // get all notes and set the intial state of the application

  const getNotes = async()=>{
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url ,{
      method : 'GET',
      headers : {
        'Content-Type': "application/x-www-form-urlencoded",
        'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOGU3MDllYjZjZWRiMGZmMTUwNzEyIn0sImlhdCI6MTY4ODc5MDg0Mn0.6vWSmoE5i2mdBWn3b9dFyAnVLUQlRn_9fnOgYGi0Arw'
    }
    })
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }

  // Adding a Note

  const addNote = async (title, description, tag) => {
    // api calling is done here
    const note = { title, description, tag };

    // const url =`${host}/api/notes/addNotes`;
    const url =`${host}/api/notes/addNotes`;
    // const url ="http://localhost:8000/api/notes/addNotes";

        const response = await fetch(url ,{
          method : 'POST',
          headers : {
            'Content-Type': "application/json",
            'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOGU3MDllYjZjZWRiMGZmMTUwNzEyIn0sImlhdCI6MTY4ODc5MDg0Mn0.6vWSmoE5i2mdBWn3b9dFyAnVLUQlRn_9fnOgYGi0Arw'
        },
          body : JSON.stringify({title : title , description : description , tag : tag })
        })

    setnotes(notes.concat(note));
  };

  // Delete  a Note
  const deleteNote =async (id) => {

    const url =`${host}/api/notes/deleteNote/${id}`;

        const response = await fetch(url ,{
          method : 'DELETE',
          headers : {
            'ContentType' : 'application/json',
            'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOGU3MDllYjZjZWRiMGZmMTUwNzEyIn0sImlhdCI6MTY4ODc5MDg0Mn0.6vWSmoE5i2mdBWn3b9dFyAnVLUQlRn_9fnOgYGi0Arw'
        },
          body : JSON.stringify()
        })


    const newNotes = notes.filter((note) => note._id !== id);
    setnotes(newNotes);
  };

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // api call

    const url = `${host}/api/notes/updatenote/${id}`;

    const payload={
      title : title,
      description : description,
      tag : tag
    }

    const response = await fetch(url ,{
      method : 'POST',
      headers : {
        'Content-Type': "application/json",
        'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOGU3MDllYjZjZWRiMGZmMTUwNzEyIn0sImlhdCI6MTY4ODc5MDg0Mn0.6vWSmoE5i2mdBWn3b9dFyAnVLUQlRn_9fnOgYGi0Arw'
    },
      body : JSON.stringify({title : title , description : description , tag : tag })
    })

    const json = response.json();

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];

      if (element._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
        break;
      }
    }

    setnotes(notes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
