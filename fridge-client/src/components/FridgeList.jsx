import { useState } from 'react'
import IngredientCard from './IngredientCard'
import AddItemForm from './AddItemForm'

function FridgeList({ items, onAdd, onDelete}) {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        position: 'relative',
      }}
    >
      {items.map((ingredient, index) => (
        <IngredientCard 
          key={index} 
          ingredient={ingredient} 
          onDelete={() => onDelete(index)}
          />
      ))}
      <div
        onClick={() => setIsAdding(true)}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '150px',
          height: '150px',
          margin: '1rem',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span style={{ fontSize: '2rem', color: '#ccc' }}>+</span>
      </div>
      {isAdding && (
        <AddItemForm
          onAdd={(newItem) => {
            onAdd(newItem) // Use the onAdd function to update the parent state
            setIsAdding(false) // Close the form
          }}
          onClose={() => setIsAdding(false)}
        />
      )}
    </div>
  )
}

export default FridgeList
