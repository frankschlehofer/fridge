function IngredientCard({ ingredient }) {
    return (
      <div style={{ border: '1px solid #ccc', marginTop: '1rem', padding: '0.5rem' }}>
        <strong>{ingredient.name}</strong><br />
        Quantity: {ingredient.quantity}<br />
        Expires: {ingredient.expiration}
      </div>
    )
  }
  
  export default IngredientCard
  