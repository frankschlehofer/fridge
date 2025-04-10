function IngredientCard({ ingredient, onDelete }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '150px',
        height: '150px',
        margin: '1rem',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <strong style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
        {ingredient.name}
      </strong>
      <p style={{ margin: '0.5rem 0' }}>Quantity: {ingredient.quantity}</p>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#555' }}>
        Expires: {ingredient.expiration}
      </p>
      <button
        onClick={onDelete}
        style={{
          background: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem',
          cursor: 'pointer',
        }}
      >
        Remove
      </button>
    </div>
  )
}

export default IngredientCard
