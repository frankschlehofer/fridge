import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import IngredientList from '../components/IngredientList'
import cherry from '../assets/icons/cherry.png';
import banana from '../assets/icons/banana.png';
import apple from '../assets/icons/apple.png';
import pineapple from '../assets/icons/pineapple.png';
import watermelon from '../assets/icons/watermelon.png';
import orange from '../assets/icons/orange.png';
import grape from '../assets/icons/grape.png';
import strawberry from '../assets/icons/strawberry.png';
import AddItemForm from '../components/AddItemForm';
import SortingHeader from '../components/SortingHeader'
import UseByList from '../components/UseByList';


function FridgePage() {
  const [ingredients, setIngredients] = useState([]);
  const currentDate = new Date();
  const alreadyExpired = new Date(currentDate);
  const expiresWithin7 = new Date(currentDate);
  alreadyExpired.setDate(currentDate.getDate() - 1);
  expiresWithin7.setDate(currentDate.getDate() + 7);

  // Load persistent ingredient data on initial load (indicated by the [] at the end)
  useEffect(() => {
    fetch('http://localhost:3000/api/ingredients')
    .then((response) => response.json())
    .then((data) => setIngredients(data))
    .catch((error) => console.log('Error fetching ingredients: ', error))
  }, []);

  const handleAdd = (ingredient) => {
    console.log('Adding ingredient:', ingredient) // Debugging
    fetch('http://localhost:3000/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
    })
    .then((response) => response.json())
    .then((data) => setIngredients(data))
    .catch((error) => console.log('Error creating new ingredients: ', error))
  };

  const handleDelete = (ingredient_id) => {
    console.log(`http://localhost:3000/api/ingredients/${ingredient_id}`);
    fetch(`http://localhost:3000/api/ingredients/${ingredient_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setIngredients(data))
    .catch((error) => console.log('Error deleting ingredient: ', error))
  };

  const handleSort = (sortedIngredients) => {
    setIngredients(sortedIngredients);
  };

  return (
    <div className="app-container">
        <div className='header-banner'>
            <div className="fruit-side">
              <img src={banana} alt="banana" className="fruit-icon-shrink" />
              <img src={cherry} alt="cherry" className="fruit-icon" />
              <img src={orange} alt="orange" className="fruit-icon" />
              <img src={grape} alt="grape" className="fruit-icon" />
            </div>

            <h1 className="app-title">Fridge</h1>

            <div className="fruit-side">
              <img src={pineapple} alt="pineapple" className="fruit-icon" />
              <img src={apple} alt="apple" className="fruit-icon" />
              <img src={strawberry} alt="strawberry" className="fruit-icon" />
              <img src={watermelon} alt="watermelon" className="fruit-icon-shrink" />
            </div>
        </div>
        <div className="content">
          <div className="fridge-list">
            <h2 className="fridge-list-header">My Ingredients</h2>
            <SortingHeader ingredients={ingredients} onSort={handleSort} />
            <IngredientList items={ingredients} onDelete={handleDelete} />
            <AddItemForm onAdd={handleAdd} />
          </div>
          <div className="right-column">
            <h3 className="right-column-header">Expiring Soon</h3>
            <h3 className="use-by-header">Expired:</h3>
            <UseByList ingredients={ingredients} useBy={alreadyExpired.toISOString()} />
            <h3 className="use-by-header">Expires Today:</h3>
            <UseByList ingredients={ingredients} useBy={currentDate.toISOString()} />
            <h3 className="use-by-header">Expires Within 7 Days:</h3>
            <UseByList ingredients={ingredients} useBy={expiresWithin7.toISOString()} />
          </div>
        </div>
    </div>
  )
}

export default FridgePage;
