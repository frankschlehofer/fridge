import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import FridgeList from './components/FridgeList'
import './App.css'
import cherry from './assets/icons/cherry.png';
import banana from './assets/icons/banana.png';
import apple from './assets/icons/apple.png';
import pineapple from './assets/icons/pineapple.png';
import watermelon from './assets/icons/watermelon.png';
import orange from './assets/icons/orange.png';
import grape from './assets/icons/grape.png';
import strawberry from './assets/icons/strawberry.png';


function App() {
  const [ingredients, setIngredients] = useState([])

  const handleAdd = (ingredient) => {
    console.log('Adding ingredient:', ingredient) // Debugging
    setIngredients((prevIngredients) => [...prevIngredients, ingredient])
  }

  const handleDelete = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    )
  }

  return (
    <Router>
      <div className="app-container">
        <div className='header-banner'>
            <div className="fruit-side">
              <img src={banana} alt="banana" className="fruit-icon" />
              <img src={cherry} alt="cherry" className="fruit-icon" />
              <img src={orange} alt="orange" className="fruit-icon" />
              <img src={grape} alt="grape" className="fruit-icon" />
            </div>

            <h1 className="app-title">Fridge</h1>

            <div className="fruit-side">
              <img src={pineapple} alt="pineapple" className="fruit-icon" />
              <img src={apple} alt="apple" className="fruit-icon" />
              <img src={watermelon} alt="watermelon" className="fruit-icon" />
              <img src={strawberry} alt="strawberry" className="fruit-icon" />
            </div>
        </div>
        <div className="content">
          <div className="fridge-list">
            <h2 className="fridge-list-header">My Ingredients</h2>
          </div>
          <div className="right-column">
            <h2 className="right-column-header">Expiring Soon</h2>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
