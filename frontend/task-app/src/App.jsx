import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <nav>
          <div className='logoName'>
            <p>Task App</p>
          </div>
          <div className='imageUser'>           
            <img className='imgUser' src='#' alt='Image user' title='Image user'/>
            <p>User</p>
          </div>
        </nav>
      </header>
      <body>
        <h1>TASKS</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR,<br/ >
            The components are in <code>src/components</code>
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </body>
      <footer>
        <p>Aquí va el footer.</p>
      </footer>
    </>
  )
}

export default App
