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
    saveAllNotes();
  };

  function saveAllNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  function setDefault(){
    setCurrentId(null);
    setTitle('');
    setText('');
  }

  function deleteNote(){
    const updatedNotes = notes.filter(note => note.id !== currentId);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
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

  function test(){
    alert((notes == '') ? "true" : "false");
    alert(notes);
    alert(`Id ${currentId} Title: ${currentTitle} Notes: ${currentText}`);
    ///alert(notes.map(note => note.id === currentId ?  `Title: ${note.title} Text: ${note.text}` : undefined));
  };

  return (
    <>
      <div className='topbar'>
        <h2>Note.io</h2>
        <button className='test'onClick={() => test()}>
          Test
        </button>
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
                onChange={tle => {setTitle(tle.target.value), saveNote()}}>
              </input>
              <textarea 
                rows={25} 
                cols={40}
                defaultValue={currentNote.text}
                onChange={txt => {setText(txt.target.value), saveNote()}}
              >
              </textarea>
              <button className='delete'onClick={() => deleteNote()}>
                Delete
              </button>
            </div>
          )}
          <>
          <div className='functions'>
            <button className='test'onClick={() => test()}>
              Test
            </button>
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
