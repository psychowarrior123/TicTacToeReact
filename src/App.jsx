import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Game } from './Game.jsx'

function App() {
  const [count, setCount] = useState(0)

  return <Game />
}

export default App
