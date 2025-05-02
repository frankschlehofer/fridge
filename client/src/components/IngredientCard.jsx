function IngredientCard({ name, quantity, expiration_date, onDelete }) {
  return (
    <div className="ingredient-card">
      <div>
        <strong>{name}</strong> — {quantity}
        <br />
        <small>Expires: {expiration_date}</small>
      </div>
      <button onClick={onDelete}>❌</button>
    </div>
  );
}

export default IngredientCard;