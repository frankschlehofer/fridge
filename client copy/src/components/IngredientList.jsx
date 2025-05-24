import IngredientCard from './IngredientCard';

function IngredientList({ items, onDelete }) {
  return (
    <div className="flex flex-row flex-wrap mt-4 mb-4 gap-1 items-center">
      {items.length === 0 ? (
        <p className='font-bold text-4xl'>Time to go shopping!</p>
      ) : (
        items.map((item) => (
          <IngredientCard
            user_id={item.user_id}
            key={item.ingredient_id}
            ingredient_id={item.ingredient_id}
            name={item.name}
            quantity={item.quantity}
            expiration_date={item.expiration_date}
            onDelete={() => onDelete(item.ingredient_id)}
          />
        ))
      )}
    </div>
  );
}

export default IngredientList;