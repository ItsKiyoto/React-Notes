import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : []
  });

  const [currentTitle, setTitle] = useState('');
  const [currentText, setText] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const currentNote = notes.find(note => note.id === currentId);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes]); 

  useEffect(() => {
    const timer = setTimeout(() => {
      saveNote();
    }, 50);
    return () => clearTimeout(timer);
  }, [currentTitle, currentText]);


  function createNote(){
    const noteId = Date.now()
    setNotes([...notes, {id: noteId, title: "", text : ""}]);
    setCurrentId(noteId);
    setTitle('');
    setText('');
  };

  function saveNote(){
    const updatedNotes = notes.map(note => {
      if (note.id === currentId){
        return ({id: note.id, title: currentTitle, text: currentText});
      } else {
        return note;
      }
    })
    setNotes(updatedNotes)
  };

  function setDefault(){
    setCurrentId(null);
    setTitle('');
    setText('');
  }

  function deleteNote(){
    const updatedNotes = notes.filter(note => note.id !== currentId);
    setNotes(updatedNotes);
    setDefault();
  }

  function loadNote(id){
    notes.map(note => {
      if (note.id == id){
        setCurrentId(note.id);
        setTitle(note.title);
        setText(note.text);
      }
    });
  };

  return (
    <div className='app-container'>
      <div className='header'>
          <h2>Notes App</h2>
      </div>
        {notes == '' ? (
        <div className="welcome">  
          <p>
            Welcome
          </p>
          <p>
            Press the + to start noting down
          </p>
          <div>
            <button className='add-note-button' onClick={() => {createNote()}}>
              +
            </button>
          </div>
        </div>
        )
      :
      (
        <>
          <div className='notesElements'>
            <div className='notesList'>
              {notes.map(note => (
                <button 
                className= {note.id === currentId ? 'selected-note' : 'list-buttons'} 
                key={note.id} 
                onClick={() => loadNote(note.id)}>
                  {note.title || "Untitled"}
                </button>
              ))}
            </div>
            {currentId == null ? (
              <div className='notesMessage'>
                <p>
                  Open a note, or make a new one.
                </p>
              </div>
            ) 
            :
            (
              <div key={currentNote.id} className='noteContainer'>
                <input 
                  className='title-box'
                  type='text' 
                  placeholder='Untitled'
                  defaultValue={currentNote.title}
                  onChange={tle => {setTitle(tle.target.value)}}>
                </input>
                <textarea 
                  className='text-box'
                  rows={20} 
                  cols={40}
                  placeholder='Write a note!'
                  defaultValue={currentNote.text}
                  onChange={txt => {setText(txt.target.value)}}
                >
                </textarea>
                <div className='function-buttons'>
                  <button className='delete-button'onClick={() => deleteNote()}>
                    Delete
                  </button>
                  <button className='close-button'onClick={() => setDefault()}>
                    Close
                  </button>
                </div>
              </div>
            )}
          <button className='add-note-button' onClick={() => createNote()}>
              +
          </button>
          </div>
        </>
      )}  
    </div>
  )
}

export default App
