import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes , getNotes , editNote } = context;

  useEffect(() => {
      getNotes();
  }, [])

  
  const [note, setnote] = useState({title : "",description : "",tag :"general"})

  const handleClick = (e)=>{
    //   e.preventDefault();
    console.log(note);
      editNote(note._id,note.title , note.description , note.tag );
      ref.current.click();
  }

  const onChange = (e)=>{
      setnote({...note,[e.target.name] : e.target.value})
  }

    const updateNoteModel = (curr_note)=>{
        ref.current.click();
        setnote(curr_note);
    }
    const ref = useRef(null);
  
  return (
    <div>


<button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display : "none"}}></button>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* ----------------------------------------------------------------------------------------------------------------------------------- */}
      <form className="my-3">
        <div className="contianer-sm">
          <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title}/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <textarea type="text" name="description"  id="description" className="form-control"  onChange={ onChange}   value={note.description} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="tag" className="col-sm-2 col-form-label">
              tag
            </label>
            <div className="col-sm-10">
              <textarea type="text" name="tag"  id="tag" className="form-control"  onChange={ onChange} value={note.tag} />
            </div>
          </div>
        </div>
      </form>

      {/* ----------------------------------------------------------------------------------------------------------------------------------- */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes </button>
      </div>
    </div>
  </div>
</div>



      <h3 className="my-3">Your Notes</h3>

        <div style = {{display : "flex" , flexWrap : "wrap"}}>
        {notes.map((note) => (
          <NoteItem note={note} key={note._id}  updateNoteModel={updateNoteModel}/>
        ))}
        </div>
  
    </div>
  );
}
