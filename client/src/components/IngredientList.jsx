import IngredientCard from './IngredientCard';

function IngredientList({ items, onDelete }) {
  return (
    <div className="ingredient-list">
      {items.length === 0 ? (
        <p style={{ color: '#ccc' }}>Time to go shopping!.</p>
      ) : (
        items.map((item) => (
          <IngredientCard
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            expiration={item.expiration}
            onDelete={() => onDelete(item.id)}
          />
        ))
      )}
    </div>
  );
}

export default IngredientList;