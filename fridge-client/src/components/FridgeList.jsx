import IngredientCard from './IngredientCard'

function FridgeList({ items }) {
  return (
    <div>
      {items.length === 0 && <p>No items in fridge.</p>}
      {items.map((item, index) => (
        <IngredientCard key={index} ingredient={item} />
      ))}
    </div>
  )
}

export default FridgeList
