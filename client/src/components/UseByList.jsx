import IngredientCard from "./IngredientCard"

function UseByList({ ingredients, useBy, onDelete }) {
  const useByDate = new Date(useBy)
  useByDate.setHours(0, 0, 0, 0) // Normalize to midnight

  const parseLocalDate = (dateString) => {
    dateString = dateString.split("T")[0]
    const [year, month, day] = dateString.split("-").map(Number)
    return new Date(year, month - 1, day) // Month is 0-indexed in JavaScript
  }

  const filteredIngredients = ingredients.filter((ingredient) => {
      const expirationDate = parseLocalDate(ingredient.expiration_date) // Parse as local date
      expirationDate.setHours(0, 0, 0, 0) // Normalize to midnight

      // Compare dates numerically
      if (useByDate.getTime() === new Date().setHours(0, 0, 0, 0)) {
        return expirationDate.getTime() === useByDate.getTime() // Expiring today
      } else if (useByDate.getTime() < new Date().setHours(0, 0, 0, 0)) {
        return expirationDate.getTime() <= useByDate.getTime() // Already expired
      } else {
        return (
          expirationDate.getTime() > new Date().setHours(0, 0, 0, 0) && expirationDate.getTime() <= useByDate.getTime()
        ) // Expiring within range
    }
  })

  if (filteredIngredients.length === 0) {
    return (
      <p className="text-gray-400 italic text-sm text-center" style={{ color: "var(--text-secondary)" }}>
        No items
      </p>
    )
  }

  return (
    <>
      {filteredIngredients.map((item) => (
        <IngredientCard
          user_id={item.user_id}
          key={item.ingredient_id}
          ingredient_id={item.ingredient_id}
          name={item.name}
          quantity={item.quantity}
          expiration_date={item.expiration_date}
          onDelete={() => onDelete(item.ingredient_id)}
        />
      ))}
    </>
  )
}

export default UseByList
