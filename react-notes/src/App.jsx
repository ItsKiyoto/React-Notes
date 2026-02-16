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
    setText('');
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
    <>
      <div className='topbar'>
        <h2>Note.io</h2>
      </div>
      <div className='welcome'> 
        {notes == '' ? (
        <div className="welcomeBody">  
          <p>
            Welcome to Note.io
          </p>
          <p>
            Press the + to start noting down
          </p>
          <div className="create">
            <button className='createBut' onClick={() => {createNote()}}>
              +
            </button>
          </div>
        </div>
        )
      :
      (
        <>
          <div className='notesList'>
            {notes.map(note => (
              <button key={note.id} onClick={() => loadNote(note.id)}>
                {note.title || "Untitled"}
              </button>
            ))}
          </div>
          {currentId == null ? (
            <div>
              <p>
                Open a note, or make a new one.
              </p>
            </div> 
            ) 
          :
          (
            <div key={currentNote.id} className='noteContainer'>
              <input 
                type='text' 
                defaultValue={currentNote.title}
                onChange={tle => {setTitle(tle.target.value)}}>
              </input>
              <textarea 
                rows={25} 
                cols={40}
                defaultValue={currentNote.text}
                onChange={txt => {setText(txt.target.value)}}
              >
              </textarea>
              <button className='delete'onClick={() => deleteNote()}>
                Delete
              </button>
            </div>
          )}
          <>
          <div className='functions'>
          </div>
            <button className='addNote' onClick={() => createNote()}>
                +
            </button>
          </>
        
        </>
      )}  
      </div>
    </>
  )
}

export default App
