import { useState } from 'react'

function AddItemForm({ onAdd }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expiration, setExpiration] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !quantity || !expiration) return
    onAdd({ name, quantity, expiration })
    setName('')
    setQuantity('')
    setExpiration('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input placeholder="Expiration Date (MM/DD/YYYY)" value={expiration} onChange={e => setExpiration(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}

export default AddItemForm
