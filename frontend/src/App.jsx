import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
  }, [])

  return (
    <div>
      <h1>React + Flask Starter</h1>
      <p>{message}</p>
    </div>
  )
}

export default App
