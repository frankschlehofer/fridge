import IngredientCard from "./IngredientCard"

function IngredientList({ items, onDelete }) {
  return (
    <div className="ingredient-list">
      {items.length === 0 ? (
        <p className="font-bold text-xl text-gray-500">Time to go shopping!</p>
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
  )
}

export default IngredientList
