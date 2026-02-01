import { createElement, useState } from 'react'
import './App.css'

let noteId = 0;
let currentId = 0;

function App() {
  const [writeState, setWriteState] = useState(0);
  const [notes, setNotes] = useState([]);
  const [currentText, setText] = useState('');

  function setEditing(){
    setWriteState(writeState + 1);
  };

  function createNote(){
    setNotes([...notes, {id: ++noteId, text : ''}]);
    currentId = noteId;
  };

  function saveNote(){
    const updatedNotes = notes.map(note => {
      if (note.id === currentId){
        return ({id: note.id, text: currentText});
      } else {
        return note;
      }
    })
    setNotes(updatedNotes)
  };

  function test(){
    alert(notes.map(note => note.id === currentId ? note.text : undefined))
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
            <div key={note.id}>  
                <textarea 
                  rows={25} 
                  cols={40}
                  defaultValue={note.text}
                  onChange={txt => setText(txt.target.value)}>
                </textarea>
            </div>
          ))}
          <div className='Navigation'>
            <button className='saveNote' onClick={() => saveNote()}>
              Save
            </button>
            <button className='prevNote'>
              Previous
            </button>
            <button className='nextNote'onClick={() => test()}>
              Next
            </button>
            <button className='addNote' onClick={() => createNote()}>
                +
            </button>
          </div>
        </>
      )}  
      </div>
    </>
  )
}

export default App
