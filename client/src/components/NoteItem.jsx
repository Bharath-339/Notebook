import React, { useContext ,} from "react";
import noteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
    const {note , updateNoteModel} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;


  return (
    <div >
      <div className="card my-3" style={{width: "18rem" ,display : "inline-block" , marginLeft :"15px"}} >
        <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <button  className="btn btn-primary" onClick={()=>{updateNoteModel(note)}}>
          Update
          </button>
          <button  className="btn btn-danger mx-5" onClick={()=>{deleteNote(note._id)}}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
