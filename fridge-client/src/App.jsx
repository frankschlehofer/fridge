import { useState } from 'react'
import AddItemForm from './components/AddItemForm'
import FridgeList from './components/FridgeList'

function App() {
  const [ingredients, setIngredients] = useState([])

  const handleAdd = (ingredient) => {
    setIngredients([...ingredients, ingredient])
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Fridge App</h1>
      <AddItemForm onAdd={handleAdd} />
      <FridgeList items={ingredients} />
    </div>
  )
}

export default App
