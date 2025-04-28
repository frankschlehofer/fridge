function IngredientCard({ name, quantity, expiration, onDelete }) {
  return (
    <div className="ingredient-card">
      <div>
        <strong>{name}</strong> — {quantity}
        <br />
        <small>Expires: {expiration}</small>
      </div>
      <button onClick={onDelete}>❌</button>
    </div>
  );
}

export default IngredientCard;