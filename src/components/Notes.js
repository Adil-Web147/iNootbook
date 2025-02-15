import React, { useContext, useEffect,useRef,useState} from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes,getNotes,editNote} = context;
useEffect(()=>{
  if(localStorage.getItem('token')){
    getNotes();
  }else{
    navigate("/login");
  }
  // eslint-disable-next-line
 
},[])

const [note, setNote] = useState({id:"", etitle:"",edescription: "",etag: "",});

const updateNote=(currentNote)=>{
  ref.current.click();
  setNote({id:currentNote._id, etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
}
const ref=useRef(null);
const refClose=useRef(null);


const handleClick = (e) => {
  e.preventDefault();
  refClose.current.click();
  editNote(note.id,note.etitle,note.edescription,note.etag);
  props.showAlert("Updated Successfuuly","success");
 
};

const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
};
  return (
    <>
    <AddNote showAlert={ props.showAlert}/>
          <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Lucnch a Model
      </button>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
         <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            minLength={5}
            required
            value={note.etitle}
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            minLength={5}
            required
            value={note.edescription}
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag"  onChange={onChange}/>
                </div>
      </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container mx-1 my-2">
      {notes.length===0 && 'No Notes To Display'}
      </div>
      {notes.map((note) => {
        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
      })}
    </div>
    </>
  );
}

export default Notes;
