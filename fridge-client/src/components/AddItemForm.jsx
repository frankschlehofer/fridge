import { useState } from 'react'

function AddItemForm({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expiration, setExpiration] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !quantity || !expiration) return
    onAdd({ name, quantity, expiration }) // Pass the new ingredient to onAdd
    setName('')
    setQuantity('')
    setExpiration('')
    onClose() // Close the form
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem' }}
        />
        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem' }}
        />
        <input
          placeholder="Expiration Date (MM/DD/YYYY)"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem' }}
        />
        <button type="submit" style={{ marginRight: '0.5rem' }}>Add</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  )
}

export default AddItemForm
