import { useState, useEffect } from 'react'
import './App.css'

let noteId = 0;

function App() {
  const [writeState, setWriteState] = useState(0);
  const [notes, setNotes] = useState([]);
  const [currentTitle, setTitle] = useState('Untitled');
  const [currentText, setText] = useState('');
  const [currentId, setCurrentId] = useState(null)

  function setEditing(){
    setWriteState(writeState + 1);
  };

  function createNote(){
    setNotes([...notes, {id: ++noteId, title: "", text : ''}]);
    setCurrentId(noteId);
  };

  function saveNote(){
    const updatedNotes = notes.map(note => {
      if (currentTitle == ""){
        setTitle("Untitled")
      }
      if (note.id === currentId){
        return ({id: note.id, title: currentTitle, text: currentText});
      } else {
        return note;
      }
    })
    setNotes(updatedNotes)
  };

  function test(){
    alert(notes.map(note => note.id === currentId ?  `Title: ${note.title} Text: ${note.text}` : undefined));
  };

  return (
    <>
      <div className='topbar'>
        <h2>Note.io</h2>
      </div>
      <div className='welcome'> 
        {!writeState ? (
        <div className="welcomeBody">  
          <p>
            Welcome to Note.io
          </p>
          <p>
            Press the + to start noting down
          </p>
          <div className="create">
            <button className='createBut' onClick={() => {setEditing(), createNote()}}>
              +
            </button>
          </div>
        </div>
        )
      :
      (
        <>
          {notes.map(note => (
            <div key={note.id} className='noteContainer'>
              <input type='text' onChange={tle => {setTitle(tle.target.value), saveNote()}}>
              </input>
              <textarea 
                rows={25} 
                cols={40}
                defaultValue={note.text}
                onChange={txt => {setText(txt.target.value), saveNote()}}
              >
              </textarea>
            </div>
          ))}
          <>
          <div className='Navigation'>
            <button className='nextNote'onClick={() => test()}>
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
