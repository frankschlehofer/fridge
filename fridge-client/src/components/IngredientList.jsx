import IngredientCard from './IngredientCard';

function IngredientList({ items, onDelete }) {
  return (
    <div className="ingredient-list">
      {items.length === 0 ? (
        <p style={{ color: '#ccc' }}>No items yet.</p>
      ) : (
        items.map((item, index) => (
          <IngredientCard
            key={index}
            name={item.name}
            quantity={item.quantity}
            expiration={item.expiration}
            onDelete={() => onDelete(index)}
          />
        ))
      )}
    </div>
  );
}

export default IngredientList;