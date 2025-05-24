import { useState } from 'react';

function AddItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiration_date, setExpirationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity || !expiration_date) return;
    onAdd({ name, quantity, expiration_date });
    setName('');
    setQuantity('');
    setExpirationDate('');
    
  };

  return (
    <form className="add-item-form rounded-2xl bg-[#C4B4D1] p-5" onSubmit={handleSubmit}>
      <h3>Add Ingredient</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="date"
        placeholder="Expiration Date"
        value={expiration_date}
        onChange={(e) => setExpirationDate(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddItemForm;