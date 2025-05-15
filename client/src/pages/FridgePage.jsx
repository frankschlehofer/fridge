import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
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
import { jwtDecode } from 'jwt-decode';
import NavSideBar from '../components/NavSideBar';
import { Navigate } from 'react-router-dom';


let authToken='';
let user_id='';

function FridgePage() {
  const [ingredients, setIngredients] = useState([]);
  const currentDate = new Date();
  const alreadyExpired = new Date(currentDate);
  const expiresWithin7 = new Date(currentDate);
  alreadyExpired.setDate(currentDate.getDate() - 1);
  expiresWithin7.setDate(currentDate.getDate() + 7);

  const navigate = useNavigate();

  // Load persistent ingredient data on initial load (indicated by the [] at the end)
  useEffect(() => {
    authToken = localStorage.getItem('authToken');
    
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        user_id = decodedToken.sub;
        console.log('User ID from JWT:', user_id);

        
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      navigate('/', { replace: true });
    }
    console.log("before")
    fetch(`http://localhost:3000/api/users/${user_id}/fridgepage`)
    .then((response) => response.json())
    .then((data) => setIngredients(data))
    .catch((error) => console.log('Error fetching ingredients: ', error));

  }, []);

  const handleAdd = (ingredient) => {
    console.log('Adding ingredient:', ingredient) // Debugging
    fetch(`http://localhost:3000/api/users/${user_id}/fridgepage`, {
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
    console.log(`http://localhost:3000/api/users/${user_id}/fridgepage/${ingredient_id}`);
    fetch(`http://localhost:3000/api/users/${user_id}/fridgepage/${ingredient_id}`, {
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
    <div className='flex flex-row h-screen overflow-hidden'>
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden pt-20 pb-50 md:pl-50 md:pr-50 w-full font-[merri] ">
          <div>
            <div className="flex flex-col">
              <h2 className="text-5xl text-[#1D1E2C] font-[Ruska] p-5 bg-[#A8C686] rounded-2xl ">Expiring Soon</h2>
              <div className='p-10'>
                <div className='mb-10'>
                  <h3 className="use-by-header">Expired:</h3>
                  <UseByList ingredients={ingredients} useBy={alreadyExpired.toISOString()} onDelete={handleDelete} />
                </div>
                <div className='mb-10'>
                  <h3 className="use-by-header">Expires Today:</h3>
                  <UseByList ingredients={ingredients} useBy={currentDate.toISOString()} onDelete={handleDelete} />
                </div>
                <div>
                  <h3 className="use-by-header">Expires Within 7 Days:</h3>
                  <UseByList ingredients={ingredients} useBy={expiresWithin7.toISOString()} onDelete={handleDelete} />
                </div>
              </div>
            </div>
            <div className="fridge-list mt-4">
              <div className='flex flex-row flex-wrap gap-5 items-center p-5 bg-[#C4B4D1] rounded-2xl'>
                <h2 className="fridge-list-header font-[Ruska] text-5xl">My Ingredients</h2>
                <SortingHeader ingredients={ingredients} onSort={handleSort} />
              </div>
              <IngredientList items={ingredients} onDelete={handleDelete} />
              <AddItemForm onAdd={handleAdd} />
            </div>
            
          </div>
      </div>
    </div>
    
  )
}

export default FridgePage;
