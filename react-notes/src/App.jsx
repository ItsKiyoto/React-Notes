import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div>
        <h2>Note.io</h2>
      </div>
      <div className="welcome-body">  
      <p>
        Welcome to Note.io
      </p>
      <p>
        Press the + to start noting down
      </p>
      </div>
      <div className="create">
        <button onClick={() => alert("Hey the button is working") }>
          +
        </button>
      </div>
    </>
  )
}

export default App
