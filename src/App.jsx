import { useState } from 'react'
import './App.css'
import Dashboard from './Components/Dashboard/dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Dashboard />
    </>
  )
}

export default App
