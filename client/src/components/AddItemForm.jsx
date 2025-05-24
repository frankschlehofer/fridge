"use client"

import { useState } from "react"

function AddItemForm({ onAdd }) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [expiration_date, setExpirationDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !quantity || !expiration_date) return
    onAdd({ name, quantity, expiration_date })
    setName("")
    setQuantity("")
    setExpirationDate("")
  }

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <h3>Add Ingredient</h3>

      <div className="add-item-form-inputs">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

        <input
          type="date"
          placeholder="Expiration Date"
          value={expiration_date}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>

      <button type="submit">Add Ingredient</button>
    </form>
  )
}

export default AddItemForm
