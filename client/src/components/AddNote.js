import React, { useContext ,useState } from "react";
import noteContext from "../context/notes/NoteContext";


export default function AddNote() {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setnote] = useState({title : "",description : "",tag :"general"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
    }

    const onChange = (e)=>{
        setnote({...note,[e.target.name] : e.target.value})
        console.log(note);
    }

  return (
    <div>
      <h3>ADD A Note</h3>

      <form className="my-3">
        <div className="contianer-sm">
          <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <textarea type="text" name="description"  id="description" className="form-control"  onChange={ onChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="tag" className="col-sm-2 col-form-label">
              tag
            </label>
            <div className="col-sm-10">
              <textarea type="text" name="tag"  id="tag" className="form-control"  onChange={ onChange} />
            </div>
          </div>
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3" onClick={handleClick}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
