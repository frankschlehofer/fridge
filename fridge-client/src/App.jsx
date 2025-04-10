import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import FridgeList from './components/FridgeList'

function App() {
  const [ingredients, setIngredients] = useState([])

  const handleAdd = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient])
  }

  const handleDelete = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    )
  }

  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <h1 style={{ fontSize: '8rem', marginBottom: '1rem' }}>Fridge</h1>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/">
            <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>MyFridge</button>
          </Link>
          <Link to="Page2">
            <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Recipes</button>
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={<FridgeList items={ingredients} onAdd={handleAdd} onDelete={handleDelete}/>}
          />
          <Route
            path="/Page2"
            element={
              <div style={{ fontSize: '2rem' }}>
                <h1>Recipes</h1>
                <p>Coming soon...</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
